import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./middlewares/corsMiddleware";

export const app = express();

// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:5000",
//   "https://your-production-frontend.com",
// ];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // required for cookies, authorization headers, etc.
//   })
// );

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:5000",
//       "https://your-production-frontend.com",
//     ],
//     credentials: true,
//   })
// );

// Enable CORS for your frontend
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:5000"], // Add your frontend URLs
//     credentials: true, // If you're sending cookies/auth headers
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use(corsMiddleware);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

// root route
app.get("/", (req: Request, res: Response) => {
  console.log("root route");
  res.status(200).json({
    message: "Welcome to Parcel Management System Beckend",
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
