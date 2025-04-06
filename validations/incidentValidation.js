const Joi = require("joi");
// const { objectId } = require("./customValidation");
const createIncident = {
    body: Joi.object().keys({
        title: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(10).max(500),
        severity: Joi.string().valid("Low", "Medium", "High").required(),
    }),
};

module.exports = {
    createIncident,
};