// akta utils function(catchSync higher order func) banate hobe jekhane bar bar ak akjaygay try catch na kore ak jaygay kore rekhe use korbo just data ta padhiye dibo, try catch hoye ashbe
// jei func ta parameter akare akta function recieve korche, jei func tar moddhe try block e ja thake tai thakbe
// 2ta func ak arekjoner moddhe call hocche-> h.ord.func paramter hishebeo func nite pare,return eo akta func return korte pare
// arrow func e arrow r pore second bracket na dile tokhon shei func ta direct return hoy.

// this fn function will follow this type (the type represent a arrow function with paraemeter and return void
// ai req response jeta asho ai function shetakei abar resolve kore padhiye dilam shekhane.
// (fn : AsyncHandler)  ---->  parameter
// (req: Request, res: Response, next: NextFunction) =>{}  ---->  Return a new function that Express calls in where it gets called earlier
// (req: Request, res: Response, next: NextFunction)  --->  Express gives these parameters by default when it calls this function
// This is a higher-order function: a function that returns another function

import { NextFunction, Request, Response } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

// (fn : AsyncHandler)  ---->  parameter
// (req: Request, res: Response, next: NextFunction) =>{}  ---->  Return a new function that Express calls in where it gets called earlier
// (req: Request, res: Response, next: NextFunction)  --->  Express gives these parameters by default when it calls this function
export const catchAsync =
  (fn: AsyncHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.log(err);
      next(err); // pass to global error handler
    });
  };
