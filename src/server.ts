/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";
import { envVars } from "./config/env";

// type is from http
let server: Server;

const startServer = async () => {
  try {
    console.log(envVars.NODE_ENV);
    // Connect to MongoDB using Mongoose
    await mongoose.connect(envVars.DB_URL);
    console.log("connecting to mongoDB");

    //  Start the server
    server = app.listen(envVars.PORT, () => {
      console.log("server is running");
    });
  } catch (error) {
    console.log(error);
  }
};

// Call the function
startServer();

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
