import { Request, Response } from "express";

import { ListActivityService } from './ListActivityService';

export class ListActivityController {
  async handle(request: Request, response: Response){
    const { date, month, year } = request.query;
    
    const service = new ListActivityService();
    const result = await service.execute({ date, month, year });

    return response.json(result);
  }
}