var cheerio = require("cheerio");
var request = require("request");
var fs      = require("fs");

// what's our vacation date range?
var dateStart = "2016-09-10";
var dateEnd = "2016-09-17";

var fromAirport = "JFK";
var toAirport = "ATH";

// request URL:
var requestUrl = "https://www.kayak.com/flights/" + fromAirport + "-" + toAirport + "/" + dateStart + "/" + dateEnd;
// console.log("request url:", requestUrl);

const HTTP_STATUS_OK = 200;
const MOCK_USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36";
// execute the request, get some stuff from Kayak
request(
  {
    uri: requestUrl,
    method: "GET",
    headers: {
      "user-agent": MOCK_USER_AGENT
    }
  }, function (error, response, html) {
    if (!error && response.statusCode == HTTP_STATUS_OK) {
      fs.writeFile("/Users/achintyaashok/Desktop/output.html", html, function(fsErr){
        if(fsErr){
          throw fsErr;
        }
      });
      var $ = cheerio.load(html);
      console.log("Number of results: ", $("div.flightresult").length);
      // $("div.flightresult div.inner div.maindatacell div.mainInfoDiv div.pricerange a.bookitprice").each(function(i, element){
      $("div.flightresult").each(function(i, element){
        var flightIndex = $(this).attr("data-index");
        var priceBoxId = "#infolink" + String(flightIndex);
        var priceBox = $(priceBoxId);
        var price = priceBox.children("div.maindatacell").children("div.mainInfoDiv").children("div.pricerange").children("a.bookitprice").text();
        console.log(price);
      });
    }
});
//
// fs.readFile("jfk-ath.html", "utf-8", function read(err, data){
//     if(err){
//       throw err;
//     }
//     var html = data;
//     //console.log("HTML", html);
//     var $ = cheerio.load(html);
//     $("div.resultrow div.inner div.maindatacell div.mainInfoDiv div.pricerange a.results_price").each(function(i, element){
//       // console.log($(this).find("a").length);
//       console.log($(this).text());
//       console.log($(this).html());
//       // console.log("this", $(this).text());
//       // //var priceDetails = $(this).children("div.inner").children("div.maindatacell").children("div.mainInfoDiv").text();//children(".pricerange").children("a").text();
//       // // console.log(priceDetails);
//       // return;
//     });
// });
