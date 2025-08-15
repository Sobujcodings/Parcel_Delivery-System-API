"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.percel = exports.percelSchema = exports.statuslogs = void 0;
const mongoose_1 = require("mongoose");
const percel_interface_1 = require("./percel.interface");
exports.statuslogs = new mongoose_1.Schema({
    location: { type: String },
    timestamp: { type: Date },
    status: { type: String },
    note: { type: String },
}, {
    versionKey: false,
    _id: false,
});
exports.percelSchema = new mongoose_1.Schema({
    trackingId: { type: String },
    // sender mail, receiver mail padhabo --> response e padhabo senderIn, receiverId from token -> s
    // ender r mail diye db theke data ene shei sender id add kore dibo, receiver r mail diye dekhbo ai db te 
    // ai user ache naki thakle receiver mail diye tar id ber kore boshiye dibo receiverId te
    sender_email: { type: String, required: true },
    receiver_email: { type: String, required: true },
    senderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: null },
    fromAddress: { type: String, required: true },
    toAddress: { type: String, required: true },
    parcelType: { type: String },
    phone: { type: String, required: true },
    weight: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    isCancelled: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isReturned: { type: Boolean, default: false },
    isHeld: { type: Boolean, default: false },
    isFragile: { type: Boolean, default: false },
    delivery_date: { type: Date },
    parcel_status: {
        type: String,
        enum: Object.values(percel_interface_1.ParcelStatus),
        default: percel_interface_1.ParcelStatus.Requested,
    },
    statusLog: [exports.statuslogs],
    createdAt: { type: Date },
    updatedAt: { type: Date },
}, {
    timestamps: true,
});
exports.percel = (0, mongoose_1.model)("Percel", exports.percelSchema);
