import { Request, Response } from "express";

import { ListTaskService } from './ListTaskService';

export class ListTaskController {
  async handle(request: Request, response: Response){
    const { activity_id } = request.query;
    const user_id = request.user.id;
    
    const service = new ListTaskService();
    const result = await service.execute({ user_id, activity_id });

    return response.json(result);
  }
}