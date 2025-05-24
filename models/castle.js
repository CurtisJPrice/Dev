const mongoose = require("mongoose");

const castleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  builtYear: Number,
  hasMoat: Boolean,
  rooms: Number,
  legend: String,
  princessResident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Princess", require: true
  }
},
  {
    versionKey: false // close __V
  }
);


module.exports = mongoose.model("Castle", castleSchema, "castles");