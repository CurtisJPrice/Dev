const express = require("express");
const router = express.Router();

router.use("/princess", require("./princess"));
router.use("/castle", require("./castle"));

module.exports = router;