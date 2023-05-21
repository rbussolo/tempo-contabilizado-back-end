import { Router } from "express";
import { AuthenticateController } from "../modules/auth/authenticate/AuthenticateController";
import { RefreshTokenController } from "../modules/auth/refresh/RefreshTokenController";
import { ForgotPasswordController } from "../modules/users/useCases/password/forgot/ForgorPasswordController";
import { ResetCheckController } from "../modules/users/useCases/password/check/ResetCheckController";
import { ResetPasswordController } from "../modules/users/useCases/password/reset/ResetPasswordController";

const authRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const authenticateController = new AuthenticateController();
const refreshTokenController = new RefreshTokenController();
const forgotPasswordController = new ForgotPasswordController();
const resetCheckController = new ResetCheckController();
const resetPasswordController = new ResetPasswordController();

authRoutes.post("/sign", wrap(authenticateController.handle));
authRoutes.post("/refresh", wrap(refreshTokenController.handle));
authRoutes.post("/forgotPassword", wrap(forgotPasswordController.handle));
authRoutes.post("/checkToken/:token", wrap(resetCheckController.handle));
authRoutes.post("/resetPassword/:token", wrap(resetPasswordController.handle));

export { authRoutes };