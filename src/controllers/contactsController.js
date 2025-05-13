const Contact = require('../models/contactsModel');

// Get all data from Contacts database
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch contacts"})
    }
}

// Get a single contact by Id
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if(!contact) {
            return res.status(404).json({ error: "Contact not found"});
        } res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving contact"});
    }
};

module.exports = { getContacts, getContactById };