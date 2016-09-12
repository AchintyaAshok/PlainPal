var express     = require('express');
var app         = express();
var bodyParser  = require("body-parser");
var Promise     = require("bluebird");

// Listens on this port
const PORT      = 8080;

// set up the app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // convert incoming json payloads into objects

// Set up the router to intercept requests to routes
var router = express.Router();

router.get("/", function(request, response){
  response.status(200).json({ message: "Welcome to PlainPal" });
});

app.use('/', router);
app.listen(PORT);
console.log("Started PlainPalApp\nListening on... ", PORT);



// // app.use(stormpath.init(app, {
// //   web: {
// //     produces: ['application/json']
// //   }
// // }));
//
// app.on('stormpath.ready', function () {
//   app.listen(3000, 'localhost', function (err) {
//     if (err) {
//       return console.error(err);
//     }
//     console.log('Listening at http://localhost:3000');
//   });
// });
