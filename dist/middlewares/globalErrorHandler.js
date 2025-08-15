"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const globalErrorHandler = (err, 
// req: Request,
res) => {
    console.log('globalEroor', err);
    const statusCode = 500;
    const message = `Something went wrong ${err.message}`;
    if (err) {
        res.status(statusCode).json({
            success: false,
            message,
            err,
            stack: env_1.envVars.NODE_ENV === "Development" ? err.stack : null,
        });
    }
};
exports.globalErrorHandler = globalErrorHandler;
