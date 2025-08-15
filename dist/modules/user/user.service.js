"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
// this user has partial attr of model user
// it might have multiple service, so wrap it in a obj
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = exports.getUser = exports.createUser = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const user_model_1 = require("./user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// create user service(business logic)
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
    // ai mail diye user already exist kore naki dekhbo thakle err na thakle create new user.
    const isUserExist = yield user_model_1.User.findOne({ email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User Already Exist");
    }
    // hash the password then send it to the database (when password matching is needed match this using bycript also) -> 10 means kotobar hash hobe   // if we need to match this in further checking true/false
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // ai user create r sathe authprovider keo padhiye dilam (amra jani ekhane ata google na direct credentials diye kortechi tai credenditals boshiye dilam)
    const authProvider = {
        provider: "credentials",
        providerId: email,
    };
    // email to thakbei alada kore nilam + baki shob ...rest padhabo, r auth k ekhan theke define kore padhiye dilam
    const user = yield user_model_1.User.create(Object.assign({ email, password: hashedPassword, auths: [authProvider] }, rest));
    return user;
});
exports.createUser = createUser;
// Get user API
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.find({});
    // for meta data
    const totalUsers = yield user_model_1.User.countDocuments();
    return {
        data: user,
        meta: {
            total: totalUsers,
        },
    };
});
exports.getUser = getUser;
// export
exports.UserServices = {
    createUser: exports.createUser,
    getUser: exports.getUser,
};
