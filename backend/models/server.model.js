const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Server = new Schema({
  server_name: {
    type: String
  },
  server_url: {
    type: String
  },
  server_user: {
    type: String
  },
  server_password: {
    type: String
  },
  server_port: {
    type: Number
  }
});

module.exports = mongoose.model('Server', Server);