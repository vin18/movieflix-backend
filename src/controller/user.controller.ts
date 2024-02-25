import { Request, Response } from "express";

import logger from "../utils/logger";
import { loginUser, registerUser } from "../service/user.service";
import { LoginUserInput, RegisterUserInput } from "../schema/user.schema";

/**
 * @desc    Register user
 * @route   POST /api/register
 * @access  Public
 */
export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserInput["body"]>,
  res: Response
) {
  try {
    const user: any = await registerUser(req.body);

    const token = user.createJWT();
    const jwtExpiresIn = process.env.JWT_EXPIRY ?? "1d";
    const nodeEnv = process.env.ENV;

    const cookieOptions = {
      expiresIn: new Date(Date.now() + jwtExpiresIn),
      httpOnly: true,
      secure: nodeEnv === "production",
    };
    res.cookie("token", token, cookieOptions);

    return res.status(201).send(user);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

/**
 * @desc    Login user
 * @route   POST /api/login
 * @access  Private
 */
export async function loginUserHandler(
  req: Request<{}, {}, LoginUserInput["body"]>,
  res: Response
) {
  try {
    const user: any = await loginUser(req.body);

    const token = user.createJWT();
    const jwtExpiresIn = process.env.JWT_EXPIRY ?? "1d";
    const nodeEnv = process.env.NODE_ENV;

    const cookieOptions = {
      expiresIn: new Date(Date.now() + jwtExpiresIn),
      httpOnly: true,
      secure: nodeEnv === "production",
    };
    res.cookie("token", token, cookieOptions);

    return res.status(200).send(user);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

/**
 * @desc    Logout user
 * @route   GET /api/logout
 * @access  Private
 */
export async function logoutUserHandler(req: Request, res: Response) {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });

    res.status(200).json({ message: "User logged out" });
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
