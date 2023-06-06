import { Router } from "express";
import { ensuredAuthenticad } from "../middlewares/EnsureAuthenticated";
import { ListTaskController } from '../modules/tasks/useCases/list/ListTaskController';

const tasksRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const listTaskController = new ListTaskController();

tasksRoutes.get("/:activity_id", ensuredAuthenticad, wrap(listTaskController.handle));

export { tasksRoutes };
