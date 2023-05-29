import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { PasswordError } from "../../../../../errors/PasswordError";
import { UpdatePasswordService } from "./UpdatePasswordService";

export class UpdatePasswordController {
  async handle(request: Request, response: Response){
    const id = request.user.id;
    const { actualPassword, newPassword, newPasswordAgain } = request.body;

    const service = new UpdatePasswordService();
    const result = await service.execute({ id, actualPassword, newPassword, newPasswordAgain });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    } else if (result instanceof PasswordError) {
      return response.status(result.statusCode).json({ message: result.message, messages: result.messages });
    }

    return response.json({ message: "Senha alterada com sucesso!" });
  }
}