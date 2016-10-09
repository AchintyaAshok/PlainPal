var mongoose = require('mongoose');

const DB_NAME = "PlainPalDev";

// Connect to MongoDB and create/use database called todoAppTest
connection = mongoose.connect(`mongodb://localhost/${DB_NAME}`);

module.exports = {
  connection: connection
};
