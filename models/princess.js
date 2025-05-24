const mongoose = require("mongoose");

//Mongoose Schema Validation
const princessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  movie: { type: String, required: true },
  yearReleased: { type: Number, required: true },
  kingdom: { type: String },
  mainColor: { type: String },
  rating: {type: Number, minimum: 1, maximum: 5}, 
  },
  {
    versionKey: false // close __V
  }
);


module.exports = mongoose.model("Princess", princessSchema, "princesses");
