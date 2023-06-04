import { Router } from "express";
import { ensuredAuthenticad } from "../middlewares/EnsureAuthenticated";
import { CreateActivityController } from "../modules/activities/useCases/create/CreateActivityController";
import { ListActivityController } from "../modules/activities/useCases/list/ListActivityController";

const activitiesRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const createActivityController = new CreateActivityController();
const listActivityController = new ListActivityController();

activitiesRoutes.post("/", wrap(createActivityController.handle));
activitiesRoutes.get("/", ensuredAuthenticad, wrap(listActivityController.handle));

export { activitiesRoutes };
