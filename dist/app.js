"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const notFound_1 = require("./middlewares/notFound");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)());
exports.app.use("/api/v1", routes_1.router);
// root route
exports.app.get("/", (req, res) => {
    console.log("root route");
    res.status(200).json({
        message: "Welcome to Tour Management System Beckend",
    });
});
// global error handler (4 varaibles -> check error)
exports.app.use(globalErrorHandler_1.globalErrorHandler);
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err) {
//     res.status(httpStatus.BAD_REQUEST).json({
//       success: false,
//       message: `Something went wrong ${err.message}`,
//       err,
//       stack: envVars.NODE_ENV === "Development" ? err.stack : null,
//       // stack contains file detials where couses the error show only in dev.
//     });
//   }
// not found route
exports.app.use(notFound_1.notFound);
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: "Route not found",
//   });
// });
exports.default = exports.app;
