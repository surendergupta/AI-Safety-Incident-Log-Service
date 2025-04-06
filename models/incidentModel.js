const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        severity: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
        reported_at: { type: Date, default: Date.now },
    }
);

const Incident = mongoose.model('Incident', incidentSchema);

// module.exports.Incident = Incident;
// module.exports.incidentSchema = incidentSchema;

module.exports = { Incident, incidentSchema };