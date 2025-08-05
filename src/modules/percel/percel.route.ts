import { Router } from "express";
import { percelController } from "./percel.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
const router = Router();

// only senders --> agula shudhu user_role=sender hole korte parbe auth diye user_role check koro, nahole error diba, that you are not a sender or something!
router.post("/", checkAuth(Role.SENDER), percelController.createPercel);
// router.get("singledetails/:id", checkAuth(Role.SENDER), percelController.getSinglePercel);
router.patch("/cancel/:id", checkAuth(Role.SENDER), percelController.cancelParcel);
router.get("/:id/status-log",checkAuth(Role.SENDER), percelController.getStatusLogPercel);


// only receiever can perfom this api hit (user role check kro reciever hole korte diba otherwise show error n return)
router.get("/incoming-parcels", checkAuth(Role.RECEIVER), percelController.getIncomingPercel);
router.patch("/confirm-parcels/:id", percelController.confirmParcel);


// Delivery history refers to all past parcels that were !!
// Assigned to the receiver (receiver_id or receiver_email)
// Completed or finalized — i.e., no longer incoming or active
// ["Delivered", "Returned", "Cancelled"]
// jei parcel tar jonno assign kora hoicilo but kono karone delivery/confirm, returned, cancel hoye geche shegula dekhabo same like incoming status is diff
// jei parcel gular receiver id/receiver email ai token r emai/id r sathe mile shegula shob ene dekhabo shudhu jegula cancel,return,dilevy done hoice

// router.post("/delivery-parcels-history", percelController.createPercel);



// only admin can do this (users incluing sernder n reciever)
// router.post("/view-all-users", percelController.createPercel);
// router.post("/view-all-percels", percelController.createPercel);
// router.post("/block-unlock-user", percelController.createPercel);
// router.post("/block-unlock-parcel", percelController.createPercel);


export const percelRouter = router;
