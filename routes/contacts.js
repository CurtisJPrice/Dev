// Description: this file contains the routes for handling contacts in the application.
// It includes GET endpoints to retrieve all contacts and a single contact by ID.
const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require("../controllers/contacts");
// GET endpoints
router.get("/", getAllContacts);
router.get("/:id", getContact);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
