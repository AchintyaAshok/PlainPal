var mongoose            = require('mongoose');
var mongoConnection     = require('./mongoConfig').connection; // establish our connection
mongoose.Promise        = global.Promise; // mongoose promises are deprecated
var models              = require('./models/Models');

// Mongo models
var User = models.User.model;
var Trip = models.Trip.model;

// SEED Users & Trip
var achintya = new User({
  _id:        "Trevize",
  firstName:  "Achintya",
  lastNAme:   "Ashok",
  email:      "achintyaashok92@gmail.com",
  location:   "New York City",
  password:   "sosecure"
});

var achintyaTrips = [];
achintyaTrips.push(new Trip({
  sourceCityName:     "New York",
  destCityName:       "London",
  sourceAirportCode:  "JFK",
  destAirportcode:    "LHR",
  startDate:          new Date("2017-01-15"),
  endDate:            new Date("2017-01-20")
}));


achintya.save( (err) => {
  if(err) throw(err);
}).then( (user) => {
  for(trip in achintyaTrips){ // save all the trips
    trip.userId = user._id; // set it to achintya's id
    trip.save( (err) => {
      if(err) throw(err);
    });
  }
});

// var jDoe = new User({
//   _id:        "TheSameOldGuy",
//   firstName:  "John",
//   lastNAme:   "Doe",
//   email:      "johndoe@plainpal.abc",
//   location:   "Los Angeles",
//   password:   "helloJoe"
// });
