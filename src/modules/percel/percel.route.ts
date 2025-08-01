// Will you include:
// Tracking ID system?
// Status log history embedded and returned via parcel details?
// e.g., POST /parcels, GET /parcels/me, PATCH /parcels/cancel/:id, GET /parcels/:id/status-log

import { Router } from "express";
import { percelController } from "./percel.controller";
const router = Router();

router.post("/", percelController.createPercel);

// jekhono id dilei data dewa jabe na dekhte hobe ai id ai user r kina nahole nahole dewa jabe na!!
router.get("/:id", percelController.getSinglePercel);

export const percelRouter = router;
