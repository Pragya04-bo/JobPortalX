// utils/ErrHandler.js or middlewares/error.js

class ErrHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const middleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    // Handle CastError (e.g., invalid MongoDB ObjectId)
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrHandler(message, 400);
    }

    // Handle duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate field: ${Object.keys(err.keyValue)} entered`;
        err = new ErrHandler(message, 400);
    }

    // Handle JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `JSON Web Token is invalid. Try again.`;
        err = new ErrHandler(message, 400);
    }

    // Handle expired JWT
    if (err.name === "TokenExpiredError") {
        const message = `JSON Web Token has expired. Try again.`;
        err = new ErrHandler(message, 400);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrHandler;
