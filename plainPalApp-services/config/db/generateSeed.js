var mongoose            = require('mongoose');
var mongoConnection     = require('./mongoConfig').connection; // establish our connection
mongoose.Promise        = global.Promise; // mongoose promises are deprecated
var models              = require('./models/Models');

// Mongo models
var User = models.User.model;
var Trip = models.Trip.model;

// DELETE ANY STALE DATA
User.collection.remove();
Trip.collection.remove();

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
  destAirportCode:    "LHR",
  startDate:          new Date("2017-01-15"),
  endDate:            new Date("2017-01-20")
}));
achintyaTrips.push(new Trip({
  sourceCityName:     "New York",
  destCityName:       "Miami",
  sourceAirportCode:  "JFK",
  destAirportCode:    "MIA",
  startDate:          new Date("2017-04-20"),
  endDate:            new Date("2017-01-24")
}));

achintya.save()
.then( (user) => {
  console.log(`Created: ${user}`);
  for(var i=0; i<achintyaTrips.length; ++i){
    var trip = achintyaTrips[i];
    trip.userId = user._id;
  }
  Trip.create(achintyaTrips, (err, data) => {
    if(err) throw(err)
    else{
      console.log(`Created ${data.length} Trips.`);
      process.exit(0);
    }
  })
})
.catch( (error) => {
  console.log(`Unexpected error. Cannot create trips for user. Error: ${error}`);
});

// var jDoe = new User({
//   _id:        "TheSameOldGuy",
//   firstName:  "John",
//   lastNAme:   "Doe",
//   email:      "johndoe@plainpal.abc",
//   location:   "Los Angeles",
//   password:   "helloJoe"
// });
