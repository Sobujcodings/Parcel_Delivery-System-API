"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/login", (req, res, next) => {
    // checking token to verify if the email, pass and token matched then login success
    auth_controller_1.AuthController.credentailsLogin(req, res, next);
});
router.post("/refresh-token", (req, res, next) => {
    auth_controller_1.AuthController.getNewAccessToken(req, res, next);
});
// logout route (clear cookies for access,refresh token)
exports.AuthRouter = router;
