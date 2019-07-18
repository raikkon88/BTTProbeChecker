const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
  user_name: String,
  user_email: String,
  user_password: String
});

module.exports = mongoose.model('User', User);