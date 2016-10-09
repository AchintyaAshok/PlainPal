var mongoose = require('mongoose');

// SCHEMAS
var UserSchema = new mongoose.Schema({
  _id:        String, // nickname/identifier
  firstName:  String, // first name of the user
  lastName:   String, // last name of the user
  email:      String, // email so that we can send the user messages
  location:   String, // the place where the person is located, their home city ex. "New York"
  password:   String, // hashed copy of the password
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
  schema: UserSchema,
  model:  User
};
