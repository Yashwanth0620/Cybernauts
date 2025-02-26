
const constants = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };
  
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
      case constants.VALIDATION_ERROR:
        res.status(400).json({
          title: "Validation Failed",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.UNAUTHORIZED:
        res.status(401).json({
          title: "Un-Authorized",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.FORBIDDEN:
        res.status(403).json({
          title: "Forbidden access",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.NOT_FOUND:
        res.status(404).json({
          title: "Not Found",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.SERVER_ERROR:
        res.status(500).json({
          title: "Server Error",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      default:
        break;
    }
  };
  
  module.exports = errorHandler;
  