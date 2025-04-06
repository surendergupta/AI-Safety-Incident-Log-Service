const { Incident } = require("../models");

const getIncidents = async () => {
    const incidents = await Incident.find();
    return incidents;
};

const createIncident = async (incidentData) => {
    const incident = await Incident.create(incidentData);
    return incident;
};

const getIncidentById = async (incidentId) => {
    const incident = await Incident.findById(incidentId);
    return incident;
};

// const updateIncident = async (incidentId, incidentData) => {
//     const incident = await Incident.findByIdAndUpdate(incidentId, incidentData, { new: true, runValidators: true });
//     return incident;
// };

const deleteIncident = async (incidentId) => {
    const incident = await Incident.findByIdAndDelete(incidentId);
    return incident;
};

module.exports = {
    getIncidents,
    createIncident,
    getIncidentById,
    // updateIncident,
    deleteIncident,
};