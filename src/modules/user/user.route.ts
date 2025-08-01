/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validationRequest } from "../../middlewares/validateRequest";
const router = Router();

// ekhane zod use kore register/user create a time e data k validate korbo akta middleware use kore then shetake controller e padhabo -> majhkhane akta middleware add kore validate kore nilam(majh rastay atkiye atai middleware r kaj)
router.post("/register", validationRequest(createUserZodSchema), UserControllers.createdUser);

router.get("/all-users", UserControllers.getUser);

export const userRoutes = router;


