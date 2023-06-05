import { Request, Response } from "express";

import { ListActivityService } from './ListActivityService';

export class ListActivityController {
  async handle(request: Request, response: Response){
    const { date, month, year } = request.query;
    const user_id = request.user.id;
    
    const service = new ListActivityService();
    const result = await service.execute({ user_id, date, month, year });

    return response.json(result);
  }
}