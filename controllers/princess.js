const mongoose = require("mongoose");
const Princess = require("../models/princess"); 

// GET all princesses
const getAll = async (req, res) => {
    const princesses = await Princess.find();
    res.status(200).json(princesses);
};

// GET a single princess by ID
const getSingle = async (req, res) => {
    const princess = await Princess.findById(req.params.id);
    if (princess) {
      res.status(200).json(princess);
    } else {
      res.status(404).json({ message: "Princess not found." }); // Not Found, changed for professional look as recommended by grader
  }
    
};

// CREATE a new princess
const createPrincess = async (req, res) => {
  try {
    const princess = new Princess(req.body);
    await princess.save();
    res.status(201).json({
      message: "Princess created successfully.",
      princessId: princess._id
    });
  } catch {
      res.status(500).json({ error: "Failed to create princess." });
    }
  
};

// UPDATE a princess by ID
const updatePrincess = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid princess ID format." });
  }

  try {
    const result = await Princess.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (result) {
      res.status(200).json({ message: "Princess updated successfully." });
    } else {
      res.status(404).json({ message: "Princess not found." });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: "Validation failed", details: err.errors });
    }
    res.status(500).json({ error: "Failed to update princess." });
  }
};

// DELETE a princess by ID
const deletePrincess = async (req, res) => {
   try {
    const result = await Princess.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Princess not found" });
    }
  } catch {
    res.status(400).json({ error: "Invalid ID format" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createPrincess,
  updatePrincess,
  deletePrincess
};
