import { Express, Request, Response } from "express";

import validate from "./middleware/validateResource";
import protectUser from "./middleware/protectUser";
import { loginUserSchema, registerUserSchema } from "./schema/user.schema";
import {
  registerUserHandler,
  loginUserHandler,
  logoutUserHandler,
} from "./controller/user.controller";

function routes(app: Express) {
  app.get(`/healthcheck`, (req: Request, res: Response) => res.status(200));

  app.post(`/api/register`, validate(registerUserSchema), registerUserHandler);
  app.post(`/api/login`, validate(loginUserSchema), loginUserHandler);
  app.get(`/api/logout`, protectUser, logoutUserHandler);
}

export default routes;
