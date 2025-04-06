const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { incidentService: Incident } = require("../services");

const getAllIncidents = catchAsync(async (req, res) => {
    try {
        const incidents = await Incident.getIncidents();
        res.status(200).json(incidents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const createIncident = catchAsync(async (req, res) => {
    try {
        const { title, description, severity } = req.body;
        if (!title || !description || !["Low", "Medium", "High"].includes(severity)) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Invalid input");
            // return res.status(400).json({ error: "Invalid input" });
        }
        const incident = await Incident.createIncident(req.body);
        res.status(201).json(incident);
        // res.status(201).json(incident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getIncidentById = catchAsync(async (req, res) => {
    try {
        const incident = await Incident.getIncidentById(req.params.id);
        if (!incident) throw new ApiError(httpStatus.NOT_FOUND, "Incident not found" );
        res.status(200).json(incident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// const updateIncident = catchAsync(async (req, res) => {
//     try {
//         const incident = await Incident.updateIncident(req.params.id, req.body);
//         if (!incident) throw new ApiError(httpStatus.NOT_FOUND, "Incident not found");
//         res.status(200).json(incident);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

const deleteIncident = catchAsync(async (req, res) => {
    try {
        const incident = await Incident.deleteIncident(req.params.id);
        if (!incident) throw new ApiError(httpStatus.NOT_FOUND, "Incident not found");
        res.status(200).json({ message: "Incident deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    getAllIncidents,
    createIncident,
    getIncidentById,
    // updateIncident,
    deleteIncident,
  };