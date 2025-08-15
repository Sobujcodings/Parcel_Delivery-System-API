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
exports.AuthController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_service_1 = require("./auth.service");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const credentailsLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginInfo = yield auth_service_1.AuthCredentailService.credentailsLogin(req.body);
        // send refresh token to the response cookies while login
        res.cookie("accessToken", loginInfo.accessToken, {
            httpOnly: true,
            secure: false,
        });
        // send refresh token to the response cookies while login
        res.cookie("refreshToken", loginInfo.refreshToken, {
            httpOnly: true,
            secure: false,
        });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "Login Successfully",
            data: loginInfo,
        });
    }
    catch (error) {
        next(error);
        // then this error will show from the global error handler using next()
    }
});
const getNewAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // take refreshtoken in cookies from the request that was inserted in cookies while login
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "No refresh token found in cookies");
        }
        const tokenInfo = yield auth_service_1.AuthCredentailService.getNewAccessToken(refreshToken);
        // send refresh token to the response cookies while login
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: false,
        });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "Login Successfully",
            data: tokenInfo,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AuthController = {
    credentailsLogin,
    getNewAccessToken,
};
