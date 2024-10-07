
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
        res.json({
          title: "Validation Failed",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.UNAUTHORIZED:
        res.json({
          title: "Un-Authorized",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.FORBIDDEN:
        res.json({
          title: "Forbidden access",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.NOT_FOUND:
        res.json({
          title: "Not Found",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.SERVER_ERROR:
        res.json({
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
  