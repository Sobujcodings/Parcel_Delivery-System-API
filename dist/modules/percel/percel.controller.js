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
exports.percelController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const percel_service_1 = require("./percel.service");
const AppError_1 = __importDefault(require("../../utils/AppError"));
// sender logic
const createPercel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const percel = yield percel_service_1.percelService.createPercel(req, req.body);
        // console.log("percelController", percel);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "percel Created Successfully",
            data: percel,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSinglePercel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const percel = yield percel_service_1.percelService.getSinglePercel(id);
        console.log("percelController", percel);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "percel get Successfully",
            data: percel,
        });
    }
    catch (error) {
        next(error);
    }
});
const cancelParcel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const percel = yield percel_service_1.percelService.cancelParcel(id, req);
        // console.log("percelController", percel);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "percel cancel Successfully",
            data: percel,
        });
    }
    catch (error) {
        next(error);
    }
});
const getStatusLogPercel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const percel = yield percel_service_1.percelService.getStatusLogPercel(id);
        // console.log("percelController", percel);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "percel statusLog get Successfully",
            data: (percel === null || percel === void 0 ? void 0 : percel.statusLog) || [],
        });
    }
    catch (error) {
        next(error);
    }
});
// receiver logic
const getIncomingPercel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const id = req.header;
        const percel = yield percel_service_1.percelService.getIncomingPercel(req);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "Incoming percels get Successfully",
            data: percel,
        });
    }
    catch (error) {
        next(error);
    }
});
const confirmParcel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const percel = yield percel_service_1.percelService.confirmParcel(id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "Parcel Confirm Successfully",
            data: percel,
        });
    }
    catch (error) {
        next(error);
    }
});
const deliveryHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const percel = yield percel_service_1.percelService.deliveryHistory(token);
        // console.log("percelController", percel);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "get parcel history Successfully",
            data: percel,
        });
    }
    catch (error) {
        next(error);
    }
});
// admin logic
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const percel = yield percel_service_1.percelService.getAllUsers();
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "All users get Successfully",
            data: percel,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllParcels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const percel = yield percel_service_1.percelService.getAllParcels();
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "All users get Successfully",
            data: percel,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateUserRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const percel = yield percel_service_1.percelService.updateUserRole(id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "Parcel Confirm Successfully",
            data: percel,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateUserActiveStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body) {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "_id, isActive status required");
        }
        ;
        const percel = yield percel_service_1.percelService.updateUserActiveStatus(req);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "User isActive updated Successfully",
            data: percel,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateparcelStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body) {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "_id, Parcel status required");
        }
        ;
        const percel = yield percel_service_1.percelService.updateparcelStatus(req);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "parcel_status updated Successfully",
            data: percel,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.percelController = {
    createPercel,
    getSinglePercel,
    cancelParcel,
    getStatusLogPercel,
    getIncomingPercel,
    confirmParcel,
    deliveryHistory,
    getAllUsers,
    getAllParcels,
    updateUserRole,
    updateUserActiveStatus,
    updateparcelStatus,
};
