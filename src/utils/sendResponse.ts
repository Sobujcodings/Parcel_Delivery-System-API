import { Response } from "express";

// meta -> data r statiscilaly nishab nikash, koyta data ache, koynumber page e achi, ki ki filtering opt ache etc..
// “I’m writing a function where the type of data can vary — and I want TypeScript to track what that type is.”
// So T is just a placeholder for any type, like string, number, User, Post[], etc.


interface TMeta {
  total: number;
}

interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
}

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};
