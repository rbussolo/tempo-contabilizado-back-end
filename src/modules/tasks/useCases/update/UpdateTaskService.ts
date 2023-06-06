import { AppError } from '../../../../errors/AppError';
import { AppDataSource } from "../../../../data-source";
import { getDuration } from "../../../../utils/Utils";
import { TaskStats } from '../../entities/TaskStats';
import { Task } from '../../entities/Task';

interface UpdateTaskRequest {
  user_id: number;
  id: number;
  description: string;
  startTime: string;
  stopTime?: string;
}

export class UpdateTaskService {
  async execute({ user_id, id, description, startTime, stopTime }: UpdateTaskRequest): Promise<AppError | null>{
    if (!id) {
      return new AppError("É necessário informar o Id da Atividade!");
    } else if (!user_id) {
      return new AppError("É necessário informar o Id do Usuário!");
    } else if (!description) {
      return new AppError("É necessário informar a Descrição!");
    } else if (!startTime) {
      return new AppError("É necessário informar o Hora de Início!");
    }

    const duration = getDuration(startTime, stopTime);
    
    if (duration < 0) {
      return new AppError("O horário do termino deve ser maior que o horário inicial!");
    }
    
    const stats = duration > 0 ? TaskStats.Finished : TaskStats.InProgress;
    
    const repo = AppDataSource.getRepository(Task);
    const task = await repo.findOne({ where: { id } });

    if (!task || task.activity.user_id !== user_id) {
      return new AppError("Tarefa não localizada!");
    }

    task.description = description;
    task.stats = stats;
    task.duration = duration;
    task.startTime = startTime;
    task.stopTime = stopTime;

    await repo.save(task);
  }
}