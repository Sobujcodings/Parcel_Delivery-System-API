import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import cookieParser from "cookie-parser";

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", router);

// root route
app.get("/", (req: Request, res: Response) => {
  console.log("root route");
  res.status(200).json({
    message: "Welcome to Tour Management System Beckend",
  });
});

// global error handler (4 varaibles -> check error)
app.use(globalErrorHandler);
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
app.use(notFound);
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: "Route not found",
//   });
// });

export default app;
