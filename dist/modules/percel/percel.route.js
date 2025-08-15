"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.percelRouter = void 0;
const express_1 = require("express");
const percel_controller_1 = require("./percel.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
// only senders.
router.post("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.SENDER), percel_controller_1.percelController.createPercel);
router.patch("/cancel/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.SENDER), percel_controller_1.percelController.cancelParcel);
router.get("/:id/status-log", (0, checkAuth_1.checkAuth)(user_interface_1.Role.SENDER), percel_controller_1.percelController.getStatusLogPercel);
// router.get("singledetails/:id", checkAuth(Role.SENDER), percelController.getSinglePercel);
// only receiever.
router.get("/incoming-parcels", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RECEIVER), percel_controller_1.percelController.getIncomingPercel);
router.patch("/confirm-parcels/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RECEIVER), percel_controller_1.percelController.confirmParcel);
router.get("/delivery-history", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RECEIVER), percel_controller_1.percelController.deliveryHistory);
// only admin.
router.get("/view-all-users", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), percel_controller_1.percelController.getAllUsers);
router.get("/view-all-parcels", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), percel_controller_1.percelController.getAllParcels);
router.patch("/update-user-role/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), percel_controller_1.percelController.updateUserRole);
router.post("/update-user-active-status", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), percel_controller_1.percelController.updateUserActiveStatus);
router.post("/update-parcel-status", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), percel_controller_1.percelController.updateparcelStatus);
exports.percelRouter = router;
// TODO:
// after generate accesstoken set it to the req.user cookies(so that frontend can use it).
// generate refresh token when access token is expired.
// record video
