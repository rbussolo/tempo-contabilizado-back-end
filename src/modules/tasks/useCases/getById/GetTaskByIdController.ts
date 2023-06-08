import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { GetTaskByIdService } from "./GetTaskByIdService";

export class GetTaskByIdController {
  async handle(request: Request, response: Response) {
    const id: number = +request.params.id;
    const user_id = request.user.id;
    
    const service = new GetTaskByIdService();
    const result = await service.execute({ user_id, id });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}