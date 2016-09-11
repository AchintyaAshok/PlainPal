/* This is the main file that will act as the de-facto server */
var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var Promise     = require("bluebird"); // so we can chain async operations
var fs          = Promise.promisifyAll(require("fs")); // promisify fs so we can chain operations
var path        = require("path");

// my libraries
const LIB_DIR     = "lib";
const SCRAPER_DIR = path.join(__dirname, LIB_DIR, "scrapers");
var kayak         = require(SCRAPER_DIR + "/kayakScraper");

const PORT = 3000;
const DATA_DIR = "data";

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// SET THE ROUTES
router.get('/', function(request, response) {
  response.json({ message: 'hooray! welcome to Plain Pal API!!' });
});

/* This allows you to get all the trips */
router.get("/trips", function(request, response){
  var directoryPath = path.join(__dirname, DATA_DIR);
  console.log("Getting files from directory: ", directoryPath);

  var fileData = [];

  fs.readdirAsync(directoryPath).map(function(filename){
    filename = path.join(directoryPath, filename);
    return fs.readFileAsync(filename, 'utf-8').then(function(contents){
      fileData.push(JSON.parse(contents));
    });
  })
  .then(function(){
    console.log("\n\n\nNum Trips: ", fileData.length);
    response.json( { flightData: fileData } );
  })
  .catch(function(error){
    console.log("ERROR: ", error);
    response.status(500).json({error: error});
  });
});

/* Create a new trip */
router.post('/trips', function(request, response){
  console.log("trips payload: ", request.body);
  var source = request.body.source;
  var destination = request.body.destination;
  kayak.getTripDetails(source, destination, new Date(2016, 10, 11), new Date(2016, 10, 19))
  .then(function(){
    response.sendStatus(200);
  })
  .catch(function(error){
    console.log("ran into some error... ", error);
    response.status(500).json({error: error}).end();
  });
});

// Register the base root for the API
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(PORT);
console.log('Listening on port: ' + PORT);
