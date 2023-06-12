import { Request, Response } from "express";

import { ListCalendarService } from './ListCalendarService';

export class ListCalendarController {
  async handle(request: Request, response: Response){
    const { date_initial, date_final } = request.query;
    const user_id = request.user.id;
    
    const service = new ListCalendarService();
    const result = await service.execute({ user_id, date_initial, date_final });

    return response.json(result);
  }
}