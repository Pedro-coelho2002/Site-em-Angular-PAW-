var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: String,
    address: String,
    password: String,
    contact: Number,
    email: String,
    cargo: String,
    nif: Number,
    points: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);