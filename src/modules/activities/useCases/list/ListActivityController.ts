import { Request, Response } from "express";

import { ListActivityService } from './ListActivityService';

export class ListActivityController {
  async handle(request: Request, response: Response){
    const { date, date_initial, date_final } = request.query;
    const user_id = request.user.id;
    
    const service = new ListActivityService();
    const result = await service.execute({ user_id, date, date_initial, date_final });

    return response.json(result);
  }
}