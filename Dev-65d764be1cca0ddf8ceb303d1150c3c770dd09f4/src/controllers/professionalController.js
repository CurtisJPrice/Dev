const Professional = require('../models/professionalModel');

// Get all data from Professional database
const getProfessionalData = async (req, res) => {
  try {
    const professional = await Professional.find();
    console.log("All data in MongoDB:", professional);
    
    if (professional.length === 0) {
      return res.status(404).json({ message: "No data found in MongoDB" });
    }
    
    res.json(professional[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getProfessionalData
}