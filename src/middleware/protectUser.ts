import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model";
import { DataStoredInToken } from "../interfaces/auth.interface";

const protectUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error(`You don't have permission to access this resource`);
    }

    const jwtSecret = process.env.JWT_SECRET ?? "";
    const { userId } = (await jwt.verify(
      token,
      jwtSecret
    )) as DataStoredInToken;

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error(`User no longer exists`);
    }

    req.user = user;
    next();
  } catch (error) {
    throw error;
  }
};

export default protectUser;
