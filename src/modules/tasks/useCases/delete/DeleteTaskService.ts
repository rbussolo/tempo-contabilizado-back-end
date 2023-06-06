import { AppError } from '../../../../errors/AppError';
import { AppDataSource } from "../../../../data-source";
import { Task } from '../../entities/Task';

interface DeleteTaskRequest {
  user_id: number;
  id: number;
}

export class DeleteTaskService {
  async execute({ user_id, id }: DeleteTaskRequest): Promise<AppError | null>{
    if (!user_id) {
      return new AppError("É necessário informar o Id do Usuário!");
    } else if (!id) {
      return new AppError("É necessário informar o Id da Tarefa!");
    }
    
    const repo = AppDataSource.getRepository(Task);
    const task = await repo.findOne({ where: { id } });

    if (!task || task.activity.user_id !== user_id) {
      return new AppError("Tarefa não localizada!");
    }

    await repo.delete(id);
  }
}