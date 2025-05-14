// Description: This file contains the logic for handling contacts in the application.
// It includes functions to get all contacts and a single contact by ID.
const Contact = require("../models/contact");

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single contact
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new contact
exports.createContact = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  
  // Validate required fields
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json({ id: savedContact._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update contact
exports.updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};