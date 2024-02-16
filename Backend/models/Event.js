var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
  name: String,  
  description: String,
  local_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Local' },
  startDateTime: Date,
  endDateTime: Date,
  priceInfantil: Number,
  priceJuvenil: Number,
  priceAdulto: Number,
  priceSenior: Number,
  countInfantil: Number,
  countJuvenil: Number,
  countAdulto: Number,
  countSenior: Number,
  maxTickets : Number,
  image: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);
