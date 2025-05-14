// Description: This file contains the database validation logic for the contact model.
// It uses the mongoose library to define the schema and validation rules for the contact model.
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  favoriteColor: { type: String, required: true },
  birthday: { type: String, required: true }
}, {
  versionKey: false // Disables the __v field
});

module.exports = mongoose.model("Contact", contactSchema);
