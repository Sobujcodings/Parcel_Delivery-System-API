"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = require("../../middlewares/validateRequest");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.validationRequest)(user_validation_1.createUserZodSchema), user_controller_1.UserControllers.createdUser);
// shob user k akmatro admin dekhte pabe
// router.get("/all-users", checkAuth(Role.SENDER), UserControllers.getUser);
exports.userRoutes = router;
