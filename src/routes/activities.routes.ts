import { UpdateActivityController } from './../modules/activities/useCases/update/UpdateActivityController';
import { GetActivityByIdController } from './../modules/activities/useCases/getById/GetActivityByIdController';
import { Router } from "express";
import { ensuredAuthenticad } from "../middlewares/EnsureAuthenticated";
import { CreateActivityController } from "../modules/activities/useCases/create/CreateActivityController";
import { ListActivityController } from "../modules/activities/useCases/list/ListActivityController";
import { StartActivityController } from "../modules/activities/useCases/start/StartActivityController";
import { StopActivityController } from "../modules/activities/useCases/stop/StopActivityController";
import { DeleteActivityController } from "../modules/activities/useCases/delete/DeleteActivityController";

const activitiesRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const createActivityController = new CreateActivityController();
const listActivityController = new ListActivityController();
const startActivityController = new StartActivityController();
const stopActivityController = new StopActivityController();
const deleteActivityController = new DeleteActivityController();
const getActivityByIdController = new GetActivityByIdController();
const updateActivityController = new UpdateActivityController();

activitiesRoutes.post("/", ensuredAuthenticad, wrap(createActivityController.handle));
activitiesRoutes.post("/start", ensuredAuthenticad, wrap(startActivityController.handle));
activitiesRoutes.post("/stop", ensuredAuthenticad, wrap(stopActivityController.handle));
activitiesRoutes.post("/:id", ensuredAuthenticad, wrap(updateActivityController.handle));
activitiesRoutes.get("/", ensuredAuthenticad, wrap(listActivityController.handle));
activitiesRoutes.get("/:id", ensuredAuthenticad, wrap(getActivityByIdController.handle));
activitiesRoutes.delete("/:id", ensuredAuthenticad, wrap(deleteActivityController.handle));

export { activitiesRoutes };
