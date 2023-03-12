const { logWithIP } = require("../logs/logger");

class ApiError extends Error {
    constructor(status, message) {
        super();

        this.status = status;
        this.message = message;
    }

    static badRequest(message) {
        logWithIP('error', `Status: ${404}, message: ${message}`);
        return new ApiError(404, message)
    }

    static internalError(message) {
        logWithIP('error', `Status: ${500}, message: ${message}`);
        return new ApiError(500, message)
    }

    static forbiddenRequest(message) {
        logWithIP('error', `Status: ${403}, message: ${message}`);
        return new ApiError(403, message)
    }
}

module.exports = ApiError;