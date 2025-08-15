/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validationRequest } from "../../middlewares/validateRequest";
const router = Router();

router.post("/register", validationRequest(createUserZodSchema), UserControllers.createdUser);

// shob user k akmatro admin dekhte pabe
// router.get("/all-users", checkAuth(Role.SENDER), UserControllers.getUser);

export const userRoutes = router;
