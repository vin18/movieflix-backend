import { Express, Request, Response } from "express";

import validate from "./middleware/validateResource";
import requireUser from "./middleware/requireUser";
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";

function routes(app: Express) {
  app.get(`/healthcheck`, (req: Request, res: Response) => res.status(200));

  app.post(`/api/users`, validate(createUserSchema), createUserHandler);

  app.post(
    `/api/sessions`,
    validate(createSessionSchema),
    createUserSessionHandler
  );

  app.get(`/api/sessions`, requireUser, getUserSessionsHandler);

  app.delete(`/api/sessions`, requireUser, deleteSessionHandler);
}

export default routes;
