const httpStatus = require("http-status");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");

// Send response on errors
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode;
    let message = err.message || "Internal Server Error";

    if (!statusCode) {
        console.error("Undefined statusCode in error:", err);
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    
    res.locals.errorMessage = message;

    const response = {
        code: statusCode,
        message,
        ...(config.env === "development" && { stack: err.stack }),
    };

    if (config.env === "development") {
        console.error("Error occurred:", response);
    }

    res.status(500).json(response.message);
};

module.exports = {
    errorHandler,
};