import { GetTaskByIdController } from './../modules/tasks/useCases/getById/GetTaskByIdController';
import { Router } from "express";
import { ensuredAuthenticad } from "../middlewares/EnsureAuthenticated";
import { ListTaskController } from '../modules/tasks/useCases/list/ListTaskController';
import { CreateTaskController } from "../modules/tasks/useCases/create/CreateTaskController";
import { UpdateTaskController } from "../modules/tasks/useCases/update/UpdateTaskController";
import { DeleteTaskController } from "../modules/tasks/useCases/delete/DeleteTaskController";

const tasksRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const getTaskByIdController = new GetTaskByIdController();
const listTaskController = new ListTaskController();
const createTaskController = new CreateTaskController();
const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();

tasksRoutes.get("/:id", ensuredAuthenticad, wrap(getTaskByIdController.handle));
tasksRoutes.get("/", ensuredAuthenticad, wrap(listTaskController.handle));
tasksRoutes.post("/", ensuredAuthenticad, wrap(createTaskController.handle));
tasksRoutes.post("/:id", ensuredAuthenticad, wrap(updateTaskController.handle));
tasksRoutes.delete("/:id", ensuredAuthenticad, wrap(deleteTaskController.handle));

export { tasksRoutes };
