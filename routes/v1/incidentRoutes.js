const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");
const incidentValidation = require("../../validations/incidentValidation");
const incidentController = require("../../controllers/incidentController");

// GET localhost:3000/api/v1/incidents/ - Retrieve all incidents
router.get("/", incidentController.getAllIncidents);

// POST localhost:3000/api/v1/incidents/ - Create a new incident
router.post("/", validate(incidentValidation.createIncident), incidentController.createIncident);

// GET localhost:3000/api/v1/incidents/:id - Retrieve a specific incident
router.get("/:id", incidentController.getIncidentById);

// PUT localhost:3000/api/v1/incidents/:id - Update an incident
// router.put("/:id", incidentController.updateIncident);

// DELETE localhost:3000/api/v1/incidents/:id - Delete an incident
router.delete("/:id", incidentController.deleteIncident);

module.exports = router;