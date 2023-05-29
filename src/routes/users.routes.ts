import { Router } from "express";
import { ensuredAuthenticad } from "../middlewares/EnsureAuthenticated";
import { CreateUserController } from "../modules/users/useCases/create/CreateUserController";
import { DeleteUserController } from "../modules/users/useCases/delete/DeleteUserController";
import { GetUserByIdController } from "../modules/users/useCases/getById/GetUserByIdController";
import { ListUserController } from "../modules/users/useCases/list/ListUserController";
import { UpdateUserController } from "../modules/users/useCases/update/UpdateUserController";
import { UpdatePasswordController } from "../modules/users/useCases/password/update/UpdatePasswordController";

const usersRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const createUserController = new CreateUserController();
const getUserByIdController = new GetUserByIdController();
const listUserController = new ListUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const updatePasswordController = new UpdatePasswordController()

usersRoutes.post("/", wrap(createUserController.handle));
usersRoutes.get("/:id", ensuredAuthenticad, wrap(getUserByIdController.handle));
usersRoutes.get("/", ensuredAuthenticad, wrap(listUserController.handle));
usersRoutes.put("/:id", ensuredAuthenticad, wrap(updateUserController.handle));
usersRoutes.delete("/:id", ensuredAuthenticad, wrap(deleteUserController.handle));
usersRoutes.post("/password", ensuredAuthenticad, wrap(updatePasswordController.handle))

export { usersRoutes };
