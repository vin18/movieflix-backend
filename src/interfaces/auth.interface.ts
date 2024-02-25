import { Request } from "express";
import { User } from "./user.interfafce";

export interface DataStoredInToken {
  userId?: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
