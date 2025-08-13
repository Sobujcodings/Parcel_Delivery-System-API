import { NextFunction, Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login", (req, res, next : NextFunction) => {
  // checking token to verify if the email, pass and token matched then login success
  AuthController.credentailsLogin(req, res, next);
});

router.post("/refresh-token", (req, res, next : NextFunction) => {
  AuthController.getNewAccessToken(req, res, next);
});

// logout route (clear cookies for access,refresh token)

export const AuthRouter = router;
