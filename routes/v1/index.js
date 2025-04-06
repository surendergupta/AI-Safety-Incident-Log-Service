const express = require("express");
const router = express.Router();
const incidentRoutes = require("./incidentRoutes");

// Use the correct path
router.use("/incidents", incidentRoutes);

module.exports = router;
