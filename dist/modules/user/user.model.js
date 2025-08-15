"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const zod_1 = require("zod");
// use this schema to the userSchema
const authProviderSchema = new mongoose_1.Schema({
    provider: { type: String, require: true },
    providerId: { type: String, require: true },
}, {
    versionKey: false,
    _id: false,
});
// user Schema of model
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        required: true,
        // default: Role.SENDER,
    },
    phone: { type: String },
    picture: { type: String },
    adress: { type: String },
    isDeleted: { type: String },
    isActive: {
        type: String,
        enum: Object.values(user_interface_1.IsActive),
        default: user_interface_1.IsActive.ACTIVE,
    },
    isVerified: { type: zod_1.boolean, default: false },
    // jehetu koyek upay e login/reg korte pare ba google diye korar por o mail diye korte pare tai ata akta array hobe mulple auth info thakbe user r
    auths: [authProviderSchema],
}, {
    timestamps: true,
    versionKey: false,
});
// the model (which is the main thing to talk to the database)
exports.User = (0, mongoose_1.model)("User", userSchema);
