const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Server = new Schema({
  server_serial_number: String,
  server_lecture_frequency: Number,
  server_name: String,
  server_url: String,
  server_user: String,
  server_password: String,
  server_port: Number,
  server_probes: [{ type: Schema.Types.ObjectId, ref:'Probe'}]
});

module.exports = mongoose.model('Server', Server);