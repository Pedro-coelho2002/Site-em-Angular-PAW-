var mongoose = require("mongoose");

var TicketSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    local_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Local' },
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    nifNumber: Number,
    countInfantil: Number,
    countJuvenil: Number,
    countAdulto: Number,
    countSenior: Number,
    totalPrice: Number,
    image: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", TicketSchema);