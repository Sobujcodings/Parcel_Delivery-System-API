/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { percelRouter } from "../modules/percel/percel.route";

export const router = Router();

const moduleRoutes = [
  {
    // register user
    path: "/user",
    route: userRoutes,
  },
  {
    // login user using token
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/percel",
    route: percelRouter,
  },
];

moduleRoutes.forEach((route, path) => {
  router.use(route.path, route.route);
  console.log(`Registering route for path: /api/v1${path}`);
  // router.use("/user", userRoutes)
});
