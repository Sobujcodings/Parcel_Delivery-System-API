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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const env_1 = require("./config/env");
const sendSuperAdmin_1 = require("./utils/sendSuperAdmin");
// type is from http
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(env_1.envVars.NODE_ENV);
        // Connect to MongoDB using Mongoose
        yield mongoose_1.default.connect(env_1.envVars.DB_URL);
        console.log("connecting to mongoDB");
        //  Start the server
        server = app_1.app.listen(env_1.envVars.PORT, () => {
            console.log("server is running");
        });
    }
    catch (error) {
        console.log(error);
    }
});
// to use await use async (immidiatlye invoked function expression)
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
    yield (0, sendSuperAdmin_1.sendSuperAdmin)();
}))();
// 3 types error handling approach
// unhandlled rejection error (a promise err due to not using trycatch)
// uncaught rejection error (local error bhule kono kichu type kore felle without handling correctly)
// signal termination (jei server(aws) use korbo sheta off/res thakle signal err ashte pare, eg: maintanence)
// 1.unhandlled rejection error
process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection detected... Server shutting down..", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// 2 (uncaught rejection error)
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected... Server shutting down..", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// 3. Signal termination error
// ✅ reason = docker stop, kill, many cloud shutdowns
process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved... Server shutting down..");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// test SIGTERM (server nijei cntl+c diye close korle server initialize hobe msg dekhte pabo temne hut kore bondho korleo msg dekhte pabo tokhon gracefully process gula off korbo rather than shutting the server instant without any err)
// It listens for the SIGINT event.
// When you press Ctrl + C, instead of Node exiting immediately, it runs your callback.
// ✅ This is where you can:
// Close DB connections
// Stop the server
// Cleanup files or logs
// Exit manually (process.exit())
process.on("SIGINT", () => {
    console.log("signal initialize recieved... Server shutting down..");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// test to check
// Promise.reject(new Error("I forgot to catch this promise"));
// a / throw new Error("i forgot to handle this local error")
