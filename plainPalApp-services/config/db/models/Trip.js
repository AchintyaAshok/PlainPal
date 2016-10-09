var mongoose = require('mongoose');

// SCHEMAS
var TripSchema = new mongoose.Schema({
  userId:             String, // the user that this trip belongs to
  sourceCityName:     String, // Los Angeles
  destCityName:       String, // New York City
  sourceAirportCode:  String, // LAX
  destAirportCode:    String, // where you're going to
  startDate:          Date,
  endDate:            Date,   // date the person will return
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

var Trip = mongoose.model('Trip', UserSchema);

module.exports = {
  schema: TripSchema,
  model:  Trip
};
