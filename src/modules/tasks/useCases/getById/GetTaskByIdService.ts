import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { Task } from "../../entities/Task";

interface GetTaskByIdRequest {
  user_id: number;
  id: number
}

export class GetTaskByIdService {
  async execute({ user_id, id }: GetTaskByIdRequest): Promise<Task | AppError> {
    const repo = AppDataSource.getRepository(Task);
    const task = await repo.findOne({ where: { id } });

    if (!task || task.activity.user_id != user_id) {
      return new AppError("Tarefa não localizada!");
    }

    return task;
  }
}