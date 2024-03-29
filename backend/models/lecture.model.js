const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Lecture = new Schema({
  lecture_date: { type: Date, default: Date.now },
  lecture_value: String,
  lecture_probe: {  type: Schema.Types.ObjectId, ref: 'Probe' }
});

module.exports = mongoose.model('Lecture', Lecture);