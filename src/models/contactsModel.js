const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, require: true},
    email: { type: String, required: true},
    favoriteColor: { type: String},
    birthday: { type: Date}
}, {
    collection: "Contacts"
});

module.exports = mongoose.model('Contacts', contactsSchema);