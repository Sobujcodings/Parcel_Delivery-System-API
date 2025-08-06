import { Router } from "express";
import { percelController } from "./percel.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
const router = Router();

// only senders
router.post("/", checkAuth(Role.SENDER), percelController.createPercel);
router.patch("/cancel/:id", checkAuth(Role.SENDER), percelController.cancelParcel);
router.get("/:id/status-log",checkAuth(Role.SENDER), percelController.getStatusLogPercel);
// router.get("singledetails/:id", checkAuth(Role.SENDER), percelController.getSinglePercel);


// only receiever
router.get("/incoming-parcels", checkAuth(Role.RECEIVER), percelController.getIncomingPercel);
router.patch("/confirm-parcels/:id",checkAuth(Role.RECEIVER), percelController.confirmParcel);
router.get("/delivery-history", checkAuth(Role.RECEIVER), percelController.deliveryHistory);


// Validations & Business Rules (check this after api done)
// Can a sender cancel a dispatched parcel?
// Can a receiver mark a parcel as delivered themselves?
// Can blocked users access features?
// What validations will you enforce?
// e.g., user role checks, parcel ownership, delivery status flow
// Can a receiver mark a parcel as delivered themselves ??
// kono parcel blocked/cancel/return hole kintu receiver/sender shetake r udpate korte parbe na sheta just locked thakbe just view


// manage parcel(2 API) akhn kora baki ??
// jei shob parcel gula Requested obosthay ache shegula dekhte pabe admin(drkr nai all parcel thekei korte parbe)

// Cancel deliveries
// (ADMIN chaile akta parcel k (Delivered = "Delivered" --> shudhu delivered korte parbe ata only receiver korbe)
//   Approved = "Approved")
//   Dispatched = "Dispatched",
//   In_Transit = "In_Transit",
//   Cancelled = "Cancelled",
//   Returned = "Returned",
//   Held = "Held",
//   Blocked = "Blocked",


// only admin can do this (users incluing sernder n reciever)
// kono parcel blocked/cancel/return hole kintu receiver/sender shetake r udpate korte parbe na sheta just locked thakbe just view
router.get("/view-all-users", checkAuth(Role.ADMIN), percelController.getAllUsers);
router.get("/view-all-parcels",checkAuth(Role.ADMIN), percelController.getAllParcels);
router.patch("/update-user-role/:id", checkAuth(Role.ADMIN), percelController.updateUserRole);
router.post("/update-user-active-status", checkAuth(Role.ADMIN), percelController.updateUserActiveStatus);
router.post("/update-parcel-status", checkAuth(Role.ADMIN), percelController.updateparcelStatus);


export const percelRouter = router;
