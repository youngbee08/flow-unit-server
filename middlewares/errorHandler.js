const handleDuplicateError = (err) => {
  const keyPattern =
    err?.keyPattern || err?.cause?.keyPattern || err?.originalError?.keyPattern;
  const keyValue =
    err?.keyValue || err?.cause?.keyValue || err?.originalError?.keyValue;

  if (err) {
    return {
      status: 409,
      message: `The field ${Object.keys(keyPattern)} of value ${Object.values(
        keyValue
      )} already exists`,
    };
  } else {
    return null;
  }
};

const handleValidationError = (err) => {
  const enumError = Object.values(err.errors).find((e) => e.kind === "enum");
  if (err) {
    if (enumError) {
      return {
        status: 400,
        message: `Ivalid value '${enumError.value}' for field '${
          enumError.path
        }'. Allowed values: ${enumError.properties.enumValues.join(", ")}`,
      };
    }
    return {
      status: 400,
      message: err.message,
    };
  }
};

const errorHandler = (error, req, res, next) => {
  const errorCode =
    error?.code || error?.cause?.code || error?.originalError?.code;
  const errorName = error?.name;

  if (error.message === "jwt expired") {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }

  if (errorCode === 11000) {
    const err = handleDuplicateError(error);
    return res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }

  if (errorName === "ValidationError") {
    const err = handleValidationError(error);
    return res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }

  if (errorName === "CastError") {
    return res.status(400).json({
      status: "error",
      message: `Invalid ${error.path}: ${error.value}`,
    });
  }

  const errorDetails = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    code: errorCode,
    status: error.status,
    ...error,
  };
  res.status(error.status || 500).json({
    status: "error",
    message: "Something went wrong",
    errorCode: error.code,
    errorMessage: error.message,
    errStatus: error.status,
    error: errorDetails,
  });
};

module.exports = errorHandler;
