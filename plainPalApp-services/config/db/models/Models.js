/* Houses all the models that are used by mongo */
var mongoose = require('mongoose');
var Trip = require('./Trip');
var User = require('./User');

module.exports = {
  Trip: Trip,
  User: User
}
