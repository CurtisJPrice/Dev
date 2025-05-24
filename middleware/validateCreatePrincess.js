const validator = require("../helpers/validator");

const validateCreatePrincess = (req, res, next) => {
  const rules = {
    name: "required|string",
    movie: "required|string",
    yearReleased: "required|integer|min:1900|max:2025",
    kingdom: "required|string",
    mainColor: "required|string",
    rating: "required|integer|min:1|max:5"
  };

  validator(req.body, rules, {}, (err, status) => {
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        data: err
      });
    } else {
      next(); // when passed validation, next to controller
    }
  });
};

module.exports = validateCreatePrincess;