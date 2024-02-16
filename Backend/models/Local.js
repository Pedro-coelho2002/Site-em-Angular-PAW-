var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lon: Number,
  street: String,
  county: String,
  postcode: String,
  image: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Local", EventSchema);