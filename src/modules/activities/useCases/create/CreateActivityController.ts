import { Request, Response } from 'express';
import { AppError } from '../../../../errors/AppError';

import { CreateActivityService } from './CreateActivityService';

export class CreateActivityController {
  async handle(request: Request, response: Response){
    const { description, date, startTime, stopTime, tags } = request.body;
    
    const service = new CreateActivityService();
    const result = await service.execute({ description, date, startTime, stopTime, tags });
    
    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.status(200).json({ success: true });
  }
}