import { Request, Response } from 'express';
import { AppError } from '../../../../errors/AppError';

import { UpdateActivityService } from './UpdateActivityService';

export class UpdateActivityController {
  async handle(request: Request, response: Response){
    const id: number = +request.params.id;
    const { description, date, startTime, stopTime, tags } = request.body;
    const user_id = request.user.id;
    
    const service = new UpdateActivityService();
    const result = await service.execute({ user_id, id, description, date, startTime, stopTime, tags });
    
    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.status(200).json({ success: true });
  }
}