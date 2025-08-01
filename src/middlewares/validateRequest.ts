// * user router theke ai function e createUserZodSchema k padhiye diyechi parameter hishebe ata validate hoye abar next() call hoye shei ager jaygay route e chole jabe/next controller e chole jabe user k create korar jonno
// ekhane pass kore dibo (createUserZodSchema k from other file then validate hoye next() hoye reg fire jabe next process r jonno)  reg route theke 
// req.body ta k ekhan theke niye zodSchema r moddhe pass kore validate kore nibo then abar req.body te set kore dibo jate ja valu tai thake then req.body ta k diye user create korbo as it is

import { ZodObject } from "zod";

export const validationRequest = (zodSchema : ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
      // req.body same
      (req as any).body = await zodSchema.parseAsync(req.body);
      console.log(req.body);
      // if validation complete(meaning zod validation matches with requested body) go to next to further process here move to user controller and createUser
      // next() --> to move back to the process where it has been called/used which is user.route
      next();
    } catch (error) {
      next(error);
    }
};