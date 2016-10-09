var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LegDetails = new Schema({
  time: String, // time of departure in stringified form
  airportCode: String,
  airportName: String,
});

// SCHEMAS
var TripDetailsSchema = new Schema({
  tripID:         ObjectId,   // reference to the trip that this is pertinant to
  price:          Number,     // this is the price quantity, ex. 499
  currency:       String,     // the currency the price is denominated in, ex. 'USD'
  departureLeg:   LegDetails, // details for the departure
  returnLeg:      LegDetails, // details for the return
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

var TripDetails = mongoose.model('TripDetails', TripDetailsSchema);

module.exports = {
  schema: TripDetailsSchema,
  model:  TripDetails
};
