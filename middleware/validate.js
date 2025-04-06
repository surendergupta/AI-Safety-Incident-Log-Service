const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {

  // Request body should be JSON, if present
  if (Object.keys(req.body).length !== 0 && !req.is("application/json")) {
    return next(
      new ApiError(
        httpStatus.UNSUPPORTED_MEDIA_TYPE,
        "Supports JSON request body only"
      )
    );
  }

  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));

  // Compile schema to Joi schema object and validate the request object
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  // If validation fails throw 400 Bad Request error
  if (error) {
    // console.error("Validation Error:", error.details);
    const errorMessage = error.details.map((details) => details.message).join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  // Update validated fields in request with returned value
  Object.assign(req, value);

  return next();
};

module.exports = validate;
