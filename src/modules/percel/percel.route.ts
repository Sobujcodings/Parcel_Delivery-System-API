import { Router } from "express";
import { percelController } from "./percel.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
const router = Router();

// only senders.
router.post("/", checkAuth(Role.SENDER), percelController.createPercel);
router.patch("/cancel/:id", checkAuth(Role.SENDER), percelController.cancelParcel);
router.get("/:id/status-log",checkAuth(Role.SENDER), percelController.getStatusLogPercel);
// router.get("singledetails/:id", checkAuth(Role.SENDER), percelController.getSinglePercel);


// only receiever.
router.get("/incoming-parcels", checkAuth(Role.RECEIVER), percelController.getIncomingPercel);
router.patch("/confirm-parcels/:id",checkAuth(Role.RECEIVER), percelController.confirmParcel);
router.get("/delivery-history", checkAuth(Role.RECEIVER), percelController.deliveryHistory);


// only admin.
router.get("/view-all-users", checkAuth(Role.ADMIN), percelController.getAllUsers);
router.get("/view-all-parcels",checkAuth(Role.ADMIN), percelController.getAllParcels);
router.patch("/update-user-role/:id", checkAuth(Role.ADMIN), percelController.updateUserRole);
router.post("/update-user-active-status", checkAuth(Role.ADMIN), percelController.updateUserActiveStatus);
router.post("/update-parcel-status", checkAuth(Role.ADMIN), percelController.updateparcelStatus);

export const percelRouter = router;
