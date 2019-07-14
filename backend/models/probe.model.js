const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Probe = new Schema({
  probe_name: String,
  probe_server: {  type: Schema.Types.ObjectId, ref: 'Server' }
});

module.exports = mongoose.model('Probe', Probe);