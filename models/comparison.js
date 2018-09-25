const mongoose = require('mongoose');
const ComparisonSchema = mongoose.Schema({
  lat1: Number,
  lat2: Number,
  lng1: Number,
  lng2: Number,
  coords2: {lat: Number, lng: Number},
  timestamp: Number,
  input1: String,
  input2: String
});

const Comparison = module.exports = mongoose.model('Comparison', ComparisonSchema);
module.exports.getAll = (callback) => {
  Comparison.find(callback);
}
module.exports.addNew = (newComparison, callback) => {
  newComparison.save(callback);
}