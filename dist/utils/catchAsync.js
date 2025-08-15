"use strict";
// akta utils function(catchSync higher order func) banate hobe jekhane bar bar ak akjaygay try catch na kore ak jaygay kore rekhe use korbo just data ta padhiye dibo, try catch hoye ashbe
// jei func ta parameter akare akta function recieve korche, jei func tar moddhe try block e ja thake tai thakbe
// 2ta func ak arekjoner moddhe call hocche-> h.ord.func paramter hishebeo func nite pare,return eo akta func return korte pare
// arrow func e arrow r pore second bracket na dile tokhon shei func ta direct return hoy.
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
// (fn : AsyncHandler)  ---->  parameter
// (req: Request, res: Response, next: NextFunction) =>{}  ---->  Return a new function that Express calls in where it gets called earlier
// (req: Request, res: Response, next: NextFunction)  --->  Express gives these parameters by default when it calls this function
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        console.log(err);
        next(err); // pass to global error handler
    });
};
exports.catchAsync = catchAsync;
