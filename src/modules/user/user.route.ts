/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validationRequest } from "../../middlewares/validateRequest";
const router = Router();
// ekhane zod use kore register/user create a time e data k validate korbo akta middleware use kore then shetake controller e padhabo -> majhkhane akta middleware add kore validate kore nilam(majh rastay atkiye atai middleware r kaj)


// user role:user/reciever korte parbe!! role:admin(admin) kibhabe banabe bujhbe kibhabe ata admin nije kina!
router.post("/register", validationRequest(createUserZodSchema), UserControllers.createdUser);

// shob user k akmatro admin dekhte pabe
// router.get("/all-users", checkAuth(Role.SENDER), UserControllers.getUser);

export const userRoutes = router;
