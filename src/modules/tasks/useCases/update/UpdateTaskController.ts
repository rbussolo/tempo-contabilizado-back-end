import { Request, Response } from 'express';
import { AppError } from '../../../../errors/AppError';

import { UpdateTaskService } from './UpdateTaskService';

export class UpdateTaskController {
  async handle(request: Request, response: Response){
    const id: number = +request.params.id;
    const { description, startTime, stopTime } = request.body;
    const user_id = request.user.id;
    
    const service = new UpdateTaskService();
    const result = await service.execute({ user_id, id, description, startTime, stopTime });
    
    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.status(200).json({ success: true });
  }
}