import { AppError } from '../../../../errors/AppError';
import { AppDataSource } from "../../../../data-source";
import { getDuration, getTagsInArray } from "../../../../utils/Utils";
import { TaskStats } from '../../entities/TaskStats';
import { Task } from '../../entities/Task';
import { Activity } from '../../../activities/entities/Activity';

interface CreateTaskRequest {
  user_id: number;
  activity_id: number;
  description: string;
  startTime: string;
  stopTime?: string;
}

export class CreateTaskService {
  async execute({ user_id, activity_id, description, startTime, stopTime }: CreateTaskRequest): Promise<AppError | null>{
    if (!user_id) {
      return new AppError("É necessário informar o Id do Usuário!");
    } else if (!activity_id) {
      return new AppError("É necessário informar o Id da Atividade!");
    } else if (!description) {
      return new AppError("É necessário informar a Descrição!");
    } else if (!startTime) {
      return new AppError("É necessário informar o Hora de Início!");
    }

    const duration = getDuration(startTime, stopTime);
    const stats = duration > 0 ? TaskStats.Finished : TaskStats.InProgress;
    
    if (duration < 0) {
      return new AppError("O horário do termino deve ser maior que o horário inicial!");
    }
    
    const repoActivity = AppDataSource.getRepository(Activity);
    const activity = await repoActivity.findOne({ where: { id: activity_id, user_id }});

    if(!activity) {
      return new AppError("Atividade não localizada!");
    }

    const repo = AppDataSource.getRepository(Task);
    const task = repo.create({
      description,
      startTime,
      stopTime,
      duration,
      stats,
      activity_id
    });
    
    await repo.save(task);
  }
}