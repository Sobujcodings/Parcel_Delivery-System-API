"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const percel_route_1 = require("../modules/percel/percel.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        // register user
        path: "/user",
        route: user_route_1.userRoutes,
    },
    {
        // login user using token
        path: "/auth",
        route: auth_route_1.AuthRouter,
    },
    {
        path: "/parcels",
        route: percel_route_1.percelRouter,
    },
];
moduleRoutes.forEach((route, path) => {
    exports.router.use(route.path, route.route);
    // router.use("/user", userRoutes)
});
