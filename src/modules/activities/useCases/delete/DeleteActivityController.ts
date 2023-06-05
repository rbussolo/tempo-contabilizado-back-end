import { Request, Response } from 'express';
import { AppError } from '../../../../errors/AppError';

import { DeleteActivityService } from './DeleteActivityService';

export class DeleteActivityController {
  async handle(request: Request, response: Response){
    const { id } = request.body;
    const user_id = request.user.id;
    
    const service = new DeleteActivityService();
    const result = await service.execute({ user_id, id });
    
    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.status(200).json({ success: true });
  }
}