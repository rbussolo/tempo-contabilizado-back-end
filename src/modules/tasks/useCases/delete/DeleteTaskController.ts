import { Request, Response } from 'express';
import { AppError } from '../../../../errors/AppError';

import { DeleteTaskService } from './DeleteTaskService';

export class DeleteTaskController {
  async handle(request: Request, response: Response){
    const id: number = +request.params.id;
    const user_id = request.user.id;
    
    const service = new DeleteTaskService();
    const result = await service.execute({ user_id, id });
    
    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.status(200).json({ success: true });
  }
}