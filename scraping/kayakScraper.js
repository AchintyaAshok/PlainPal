var cheerio = require("cheerio");
var request = require("request");
var fs      = require("fs");

const HTTP_STATUS_OK = 200;
const MOCK_USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36";
const KAYAK_URL = "https://www.kayak.com/flights/";
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

/* This function stores trip details for the information provided. It will retreive trip
details from Kayak and store it in a local JSON file. */
function getTripDetails(sourceCity, destCity, startDate, endDate){
  console.info("Retreiving trip details:\n" + sourceCity + " - " + destCity);
  // Format the date string
  var formattedStartDate = getFormattedDate(startDate);
  var formattedEndDate = getFormattedDate(endDate);
  console.info("Dates: " + formattedEndDate + " to " + formattedEndDate);

  var requestUrl =  KAYAK_URL + sourceCity + "-" + destCity + "/" + formattedStartDate + "/" + formattedEndDate;
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
        // fs.writeFile("/Users/achintyaashok/Desktop/output.html", html, function(fsErr){
        //   if(fsErr){
        //     throw fsErr;
        //   }
        // });
        var $ = cheerio.load(html);
        console.log("Number of results: ", $("div.flightresult").length);
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
            .children("div.legholder");
          var toLeg = airlineInfo.first(); // get the to leg
          var toLegDepTime = toLeg.children("div.flightTimeDeparture").text();
          var toLegDepLocationShort = toLegDepartureTime.next().text();
          var toLegDepLocationLong = toLegDepartureTime.next().attr("title");
          var toLegArrivalTime = toLeg.children("div.flightTimeArrival");
          // Return leg details
          var returnLeg = toLeg.next();
          var returnLegDepartureTime

          // console.log(price);
        });
      }
  });
}

getTripDetails("JFK", "ATH", new Date(2016, 8, 10), new Date(2016, 8, 18));
getTripDetails("JFK", "ATH", new Date(2016, 8, 18), new Date(2016, 8, 26));
// // what's our vacation date range?
// var dateStart = "2016-09-10";
// var dateEnd = "2016-09-17";
//
// var fromAirport = "JFK";
// var toAirport = "ATH";
