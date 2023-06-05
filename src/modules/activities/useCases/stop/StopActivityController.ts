import { PasswordError } from '../../../../errors/PasswordError';
import { Request, Response } from 'express';
import { AppError } from '../../../../errors/AppError';

import { StopActivityService } from './StopActivityService';

export class StopActivityController {
  async handle(request: Request, response: Response) {
    const { id } = request.body.data;
    const user_id = request.user.id;

    const service = new StopActivityService();
    const result = await service.execute({ user_id, id });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.status(200).json({ success: true });
  }
}