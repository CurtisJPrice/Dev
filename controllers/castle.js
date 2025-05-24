const mongoose = require("mongoose");
const Castle = require("../models/castle");

// GET all castles
const getAll = async (req, res) => {
  try {
    const castles = await Castle.find().populate("princessResident", "name");
    res.status(200).json(castles);
  } catch {
    res.status(500).json({ error: "Failed to fetch castles." });
  }
};

// GET a single castle by ID
const getSingle = async (req, res) => {
  const castle = await Castle.findById(req.params.id).populate("princessResident", "name");
  if (castle) {
    res.status(200).json(castle);
  } else {
    res.status(404).json({ message: "Castle not found." });
  }
};

// CREATE a new castle
const createCastle = async (req, res) => {
  try {
    const castle = new Castle(req.body);
    await castle.save();
    res.status(201).json({
      message: "Castle created successfully.",
      castleId: castle._id
    });
  } catch {
    res.status(500).json({ error: "Failed to create castle." });
  }
};

// UPDATE a castle by ID
const updateCastle = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid castle ID format." });
  }

  try {
    const result = await Castle.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (result) {
      res.status(200).json({ message: "Castle updated successfully." });
    } else {
      res.status(404).json({ message: "Castle not found." });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: "Validation failed", details: err.errors });
    }
    res.status(500).json({ error: "Failed to update castle." });
  }
};

// DELETE a castle by ID
const deleteCastle = async (req, res) => {
  try {
    const result = await Castle.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Castle not found." });
    }
  } catch {
    res.status(400).json({ error: "Invalid ID format." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCastle,
  updateCastle,
  deleteCastle
};
