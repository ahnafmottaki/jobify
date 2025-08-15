import { Request, Response } from "express";

type ResErrorProp = {
  success: false;
  message: string;
};
type ResSuccessProp<K, T extends string> = {
  success: true;
} & { [prop in T]: K };
type ResProp<K, T extends string> = ResErrorProp | ResSuccessProp<K, T>;

type ReqBodyProp<T extends object> = Request<any, any, Partial<T>>;

export { ResErrorProp, ResSuccessProp, ResProp, ReqBodyProp };
