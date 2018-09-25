const mongoose = require('mongoose');
const ComparisonSchema = mongoose.Schema({
  lat: Number,
  lng: Number,
  timestamp: Number,
  input1: String,
  input2: String
});

const Comparison = module.exports = mongoose.model('Comparison', ComparisonSchema);

module.exports.addNew = (newComparison, callback) => {
  newComparison.save(callback);
}