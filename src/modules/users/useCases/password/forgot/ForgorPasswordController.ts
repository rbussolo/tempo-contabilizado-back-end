import { AppError } from '../../../../../errors/AppError';
import { Request, Response } from "express";
import { ForgotPasswordService } from "./ForgotPasswordService";
import { removeMaskCpfCnpj } from '../../../../../utils/RemoveMaskCpfCnpj';

export class ForgotPasswordController {
  async handle(request: Request, response: Response){
    const { email } = request.body;

    const service = new ForgotPasswordService();
    const result = await service.execute({ email });

    if(result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.status(200).json({ message: "E-mail enviado com sucesso!" });
  }
}