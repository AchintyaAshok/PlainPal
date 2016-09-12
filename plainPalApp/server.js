var express     = require('express');
var bodyParser  = require("body-parser");
var Promise     = require("bluebird");
var webpack     = require('webpack');
var config      = require('./webpack.config');

// Listens on this port
const PORT      = 8080;

var app = express();
var compiler = webpack(config);
// all the javascripts get packaged intoa  single app.js (as configured in the webpack config file)
// this tells the app to intercept all request and use the compiled app.js module
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// set up the app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // convert incoming json payloads into objects

// Send static files. Anything under this gets served up statically
app.use(express.static("build"));

// Set up the router to intercept requests to routes
var router = express.Router();

router.get("/", function(request, response){
  response.sendFile(path.join(__dirname, "build/index.html"));
  // response.status(200).json({ message: "Welcome to PlainPal" });
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
