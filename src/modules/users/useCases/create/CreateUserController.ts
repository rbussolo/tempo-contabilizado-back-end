import { PasswordError } from '../../../../errors/PasswordError';
import { Request, Response } from 'express';
import { AppError } from '../../../../errors/AppError';

import { CreateUserService } from './CreateUserService';

export class CreateUserController {
  async handle(request: Request, response: Response){
    const { email, password, name, type } = request.body;

    const service = new CreateUserService();
    const result = await service.execute({ email, password, name, type });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    } else if (result instanceof PasswordError){
      return response.status(result.statusCode).json({ message: result.message, messages: result.messages });
    }

    return response.json(result);
  }
}