"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.percelService = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const user_model_1 = require("../user/user.model");
const percel_interface_1 = require("./percel.interface");
const percel_model_1 = require("./percel.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_interface_1 = require("../user/user.interface");
// sender route
const createPercel = (req, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // automatically generated trackingId
    const trackingId = "TRK" + Date.now();
    payload.trackingId = trackingId;
    // ai req r token theke verify koren/decode kore jei id ber korbo shetai hobe senderId
    const token = req.headers.authorization;
    if (!token) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "user token is not found, please login first");
    }
    const decoded = jsonwebtoken_1.default.decode(token, { complete: true });
    if (decoded.payload.isActive === "BLOCKED") {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `Failed, this user is ${decoded.payload.isActive} now`);
    }
    payload.senderId = decoded === null || decoded === void 0 ? void 0 : decoded.payload.userId;
    // checking if the sender mail n receiver mail has user not or then send their id with the response here
    const receiver = yield user_model_1.User.findOne({ email: payload.receiver_email });
    payload.receiverId = (receiver === null || receiver === void 0 ? void 0 : receiver._id) || null;
    // default statuslog
    payload.statusLog = [
        {
            location: "System",
            timestamp: new Date(),
            status: percel_interface_1.ParcelStatus.Requested,
            note: "Parcel created and request submitted.",
        },
    ];
    const createdPercel = yield percel_model_1.percel.create(payload);
    // console.log("createdPercel", createdPercel);
    return createdPercel;
});
const getSinglePercel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getSingleParcel = yield percel_model_1.percel.findById(id);
    if (!getSingleParcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User Not found");
    }
    // console.log("getSingleParcel", getSingleParcel);
    return getSingleParcel;
});
const cancelParcel = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const toCancelParcel = yield percel_model_1.percel.findById(id);
    console.log('toCancelParcel', toCancelParcel);
    if (!toCancelParcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found for this id");
    }
    // check if user is Blocked now.
    const token = req.headers.authorization;
    if (!token) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "token not found");
    }
    console.log("token", token);
    const decoded = jsonwebtoken_1.default.decode(token, { complete: true });
    console.log("decoded", decoded);
    // check if this parcel is created by this user(from token)
    if (decoded.payload.userId != toCancelParcel.senderId) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'You are not allowed to cancel this parcel.');
    }
    if (decoded.payload.isActive === "BLOCKED") {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `Failed, this user is ${decoded.payload.isActive} now`);
    }
    // check if parcel is not approved/requested.
    if (toCancelParcel.parcel_status !== percel_interface_1.ParcelStatus.Approved &&
        toCancelParcel.parcel_status !== percel_interface_1.ParcelStatus.Requested) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, `Cancellation only allowed when status is Requested or Approved. Now parcel status is ${toCancelParcel.parcel_status}`);
    }
    // else make it cancelled.
    toCancelParcel.parcel_status = percel_interface_1.ParcelStatus.Cancelled;
    // update the statusLog
    const newStatusLog = {
        location: "System",
        timestamp: new Date(),
        status: percel_interface_1.ParcelStatus.Cancelled,
        note: "Parcel is Cancelled.",
    };
    toCancelParcel.statusLog.push(newStatusLog);
    const cancaled = yield percel_model_1.percel.findByIdAndUpdate(id, toCancelParcel, {
        new: true,
    });
    return cancaled;
});
const getStatusLogPercel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("id", id);
    const StatusLogPercel = yield percel_model_1.percel.findById(id);
    if (!StatusLogPercel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Not found");
    }
    return StatusLogPercel;
});
// receiver routes
const getIncomingPercel = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    // console.log("token", token);
    if (!token) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "token not found in the request");
    }
    const decodedToken = jsonwebtoken_1.default.decode(token, { complete: true });
    // console.log("decodedToken", decodedToken);
    // only this parcel status data will be in incoming parcels api
    const payload = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload;
    let query = {
        parcel_status: {
            $in: ["Requested", "Approved", "Dispatched", "In_Transit", "Held"],
        },
    };
    if (payload === null || payload === void 0 ? void 0 : payload.userId) {
        query = Object.assign(Object.assign({}, query), { receiverId: payload.userId });
    }
    else if (payload === null || payload === void 0 ? void 0 : payload.email) {
        query = Object.assign(Object.assign({}, query), { receiver_email: payload.email });
    }
    else {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "No user identifier found in token.");
    }
    // console.log('query', query);
    const getParcels = yield percel_model_1.percel.find(query);
    if (!getParcels || (getParcels === null || getParcels === void 0 ? void 0 : getParcels.length) === 0) {
        return [];
    }
    return {
        count: getParcels.length,
        Incoming_Parcels: getParcels,
    };
});
const confirmParcel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const toUpdateParcel = yield percel_model_1.percel.findById(id);
    // console.log("toUpdateParcel", toUpdateParcel);
    if (!toUpdateParcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found for this id");
    }
    if (["Cancelled", "Blocked", "Returned", "Held"].includes(toUpdateParcel.parcel_status)) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, `This parcel cannot be confirmed because it is currently marked as "${toUpdateParcel.parcel_status}" now, try again`);
    }
    // otherwise make it Delivered to confirm.
    toUpdateParcel.parcel_status = percel_interface_1.ParcelStatus.Delivered;
    // update the statusLog
    const newStatusLog = {
        location: "System",
        timestamp: new Date(),
        status: percel_interface_1.ParcelStatus.Delivered,
        note: "Parcel is Delivered.",
    };
    toUpdateParcel.statusLog.push(newStatusLog);
    const cancaled = yield percel_model_1.percel.findByIdAndUpdate(id, toUpdateParcel, {
        new: true,
    });
    return cancaled;
});
const deliveryHistory = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Access token not found");
    }
    const decodedToken = jsonwebtoken_1.default.decode(token, { complete: true });
    // console.log("decodedToken", decodedToken);
    // const userIdOrMail = decodedToken?.payload.userId ? decodedToken?.payload.userId : decodedToken?.payload.email;
    const getDeliveryHistory = yield percel_model_1.percel.find({
        receiverId: decodedToken.payload.userId,
        parcel_status: { $ne: "Requested" },
    });
    if (!getDeliveryHistory) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "No parcels are found");
    }
    return getDeliveryHistory;
});
// admin logic
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_model_1.User.find();
    return allUsers;
});
const getAllParcels = () => __awaiter(void 0, void 0, void 0, function* () {
    // get users ref table data also from user table that was assigned while creating parcel
    const allParcels = yield percel_model_1.percel
        .find()
        .populate("senderId", "name role email phone")
        .populate("receiverId", "name role email phone");
    return allParcels;
});
const updateUserRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const toUpdateUserRole = yield user_model_1.User.findById(id);
    // console.log("toUpdateUserRole", toUpdateUserRole);
    if (!toUpdateUserRole) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "user not found for this id");
    }
    if (toUpdateUserRole.role === "ADMIN") {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "user already a Admin");
    }
    // set
    toUpdateUserRole.role = user_interface_1.Role.ADMIN;
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, toUpdateUserRole, {
        new: true,
    });
    return updatedUser;
});
const updateUserActiveStatus = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.body", req.body);
    const toUpdateUserisActive = yield user_model_1.User.findById(req.body._id);
    console.log("toUpdateUserisActive", toUpdateUserisActive);
    if (!toUpdateUserisActive) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "user not found for this _id");
    }
    // set (isactive/inactive/block) --> user jeta chabe sheta kore dibo
    toUpdateUserisActive.isActive = req.body.isActive;
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(req.body._id, toUpdateUserisActive, {
        new: true,
    });
    return updatedUser;
});
const updateparcelStatus = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const toUpdateUserisActive = yield percel_model_1.percel.findById(req.body._id);
    // console.log("toUpdateUserisActive", toUpdateUserisActive);
    if (!toUpdateUserisActive) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "user not found for this _id");
    }
    // parcel cancel,return,delivered body te padhale update korte dewa jabe na.
    if (["Cancelled", "Returned", "Delivered"].includes(toUpdateUserisActive.parcel_status)) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, `This parcel cannot be updated coz it is currently marked as "${toUpdateUserisActive.parcel_status}" now, try again`);
    }
    toUpdateUserisActive.parcel_status = req.body.parcel_status;
    // update the statusLog
    const newStatusLog = {
        location: "System",
        timestamp: new Date(),
        status: req.body.parcel_status,
        note: `Parcel is ${req.body.parcel_status}.`,
    };
    toUpdateUserisActive.statusLog.push(newStatusLog);
    const updatedUser = yield percel_model_1.percel.findByIdAndUpdate(req.body._id, toUpdateUserisActive, {
        new: true,
    });
    return updatedUser;
});
exports.percelService = {
    createPercel,
    deliveryHistory,
    getSinglePercel,
    cancelParcel,
    getStatusLogPercel,
    getIncomingPercel,
    confirmParcel,
    getAllUsers,
    getAllParcels,
    updateUserRole,
    updateUserActiveStatus,
    updateparcelStatus,
};
