import { Router } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { VerifyToken } from "../../utils/jwt";

const router = Router();

// to verify if the user exist with this accesstoken if then stay loggled in the user.
router.get("/me", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");

  try {
    const token = req.cookies.accessToken;
    if (!token) return res.json({ success: false });

    // verify JWT (example)
    const decoded = VerifyToken(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;
    return res.json({ success: true, user: decoded });
  } catch {
    return res.json({ success: false });
  }
});

export const userMe = router;
