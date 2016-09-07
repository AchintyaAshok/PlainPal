var cheerio = require("cheerio");
var request = require("request");
var fs      = require("fs");
var path    = require('path');

const HTTP_STATUS_OK = 200;
const MOCK_USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36";
const KAYAK_URL = "https://www.kayak.com";
const DATA_DIR = "data";
// execute the request, get some stuff from Kayak

/* Formats the given date in the following format: YYYY-MM-DD */
function getFormattedDate(d){
  var startDay = d.getDate();
  if(startDay < 10) startDay = "0" + startDay;
  var startMonth = d.getMonth();
  startMonth += 1;
  if(startMonth < 10) startMonth = "0" + startMonth;
  return(d.getFullYear() + "-" + startMonth + "-" + startDay);
}

/* Returns the details for departure time, departure date,
arrival time, arrival gate */
function getFlightTimeDetails(timeBox){
  // Departure Details
  var depTimeElem = timeBox.children("div.flightTimeDeparture");
  var depTime = depTimeElem.text();
  var depLocElem = depTimeElem.next();
  var depLocShortName = depLocElem.text();
  var depLocLongName = depLocElem.attr("title");
  // Arrival Details
  var arvTimeElem = timeBox.children("div.flightTimeArrival");
  var arvTime = arvTimeElem.text();
  var arvLocElem = arvTimeElem.next();
  var arvLocShortName = arvLocElem.text();
  var arvLocLongName = arvLocElem.attr("title");
  return({
    departure: {
      time: depTime,
      location: {
        shortName: depLocShortName,
        longName: depLocLongName
      }
    },
    arrival: {
      time: arvTime,
      location: {
        shortName: arvLocShortName,
        longName: arvLocLongName
      }
    }
  });
}

/* This function stores trip details for the information provided. It will retreive trip
details from Kayak and store it in a local JSON file. */
function getTripDetails(sourceCity, destCity, startDate, endDate){
  console.info("Retreiving trip details:\n" + sourceCity + " - " + destCity);
  // Format the date string
  var formattedStartDate = getFormattedDate(startDate);
  var formattedEndDate = getFormattedDate(endDate);
  console.info("Dates: " + formattedEndDate + " to " + formattedEndDate);

  var requestUrl =  KAYAK_URL + "/flights/" + sourceCity + "-" + destCity + "/" + formattedStartDate + "/" + formattedEndDate;
  console.info("Requesting url... " + requestUrl);
  // Execute the request
  request(
    {
      uri: requestUrl,
      method: "GET",
      headers: {
        "user-agent": MOCK_USER_AGENT
      }
    }, function (error, response, html) {
      if (!error && response.statusCode == HTTP_STATUS_OK) {
        var $ = cheerio.load(html);
        console.log("Number of results: ", $("div.flightresult").length);
        // All our flight details
        var allFlightDetails = {
          sourceCity: sourceCity,
          destCity:   destCity,
          timeInterval: {
            startDate:          startDate.getTime(), // get the millisecond value for easy conversion
            formattedStartDate: formattedStartDate,
            endDate:            endDate.getTime(),
            formattedEndDate:   formattedEndDate
          },
          queryUrl: requestUrl
        };

        // All the flights
        var flights = [];
        $("div.flightresult").each(function(i, element){
          var flightIndex = $(this).attr("data-index");
          var detailsBoxId = "#infolink" + String(flightIndex);
          var detailsBox = $(detailsBoxId);

          // Get the pricing information
          var priceTag = detailsBox.children("div.maindatacell")
            .children("div.mainInfoDiv")
            .children("div.pricerange")
            .children("a.bookitprice");
          var price = priceTag.text();
          var offerLink = priceTag.attr("href");

          // Get Airline information
          var airlineInfo = detailsBox.children("div.tripdetailholder")
            .children("div.airlineAndLegs")
            .children("div.legholder")
            .children();
          // Departure Leg
          var departLeg = airlineInfo.first(); // get the to leg
          var departLegDetails = getFlightTimeDetails(departLeg);
          // Return Leg
          var retLeg = departLeg.next();
          var returnLegDetails = getFlightTimeDetails(retLeg);
          var flightDetails = {
            price:      price,
            departLeg:  departLegDetails,
            returnLeg:  returnLegDetails,
            link:       KAYAK_URL + offerLink
          };
          flights.push(flightDetails);
        });
        allFlightDetails.flights = flights;

        // Write our data
        var dataFileName = sourceCity + "-" + destCity + "-" + formattedStartDate + "-" + formattedEndDate + ".json";
        var filePath = path.join(__dirname, DATA_DIR, dataFileName);
        fs.writeFile(filePath, JSON.stringify(allFlightDetails), function(fsError){
          if(fsError){
            throw fsError;
          }
        });
      }
  });
}

// getTripDetails("JFK", "ATH", new Date(2016, 8, 10), new Date(2016, 8, 18));
// getTripDetails("JFK", "SFO", new Date(2016, 8, 18), new Date(2016, 8, 26));
getTripDetails("JFK", "FAT", new Date(2016, 9, 1), new Date(2016, 9, 9));
