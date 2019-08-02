const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Probe = new Schema({
  probe_name: String,
  probe_type: String,
  probe_room: String,
  probe_category: String,
  probe_server: {  type: Schema.Types.ObjectId, ref: 'Server' }, 
  probe_lectures:  [{ type: Schema.Types.ObjectId, ref:'Lecture'}]
});

module.exports = mongoose.model('Probe', Probe);