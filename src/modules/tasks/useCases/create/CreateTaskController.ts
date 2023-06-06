import { Request, Response } from 'express';
import { AppError } from '../../../../errors/AppError';

import { CreateTaskService } from './CreateTaskService';

export class CreateTaskController {
  async handle(request: Request, response: Response){
    const { activity_id, description, startTime, stopTime } = request.body;
    const user_id = request.user.id;
    
    const service = new CreateTaskService();
    const result = await service.execute({ user_id, activity_id, description, startTime, stopTime });
    
    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.status(200).json({ success: true });
  }
}