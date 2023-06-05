import { AppError } from '../../../../errors/AppError';
import { AppDataSource } from "../../../../data-source";
import { Activity } from "../../entities/Activity";
import { ActivityStats } from "../../entities/ActivityStats";
import { getDuration, getTagsInArray } from "../../../../utils/Utils";

interface UpdateActivityRequest {
  user_id: number;
  id: number;
  description: string;
  date: Date;
  startTime: string;
  stopTime?: string;
  tags: string;
}

export class UpdateActivityService {
  async execute({ user_id, id, description, date, startTime, stopTime, tags }: UpdateActivityRequest): Promise<AppError | null>{
    if (!id) {
      return new AppError("É necessário informar o Id da Atividade!");
    } else if (!user_id) {
      return new AppError("É necessário informar o Id do Usuário!");
    } else if (!description) {
      return new AppError("É necessário informar a Descrição!");
    } else if (!date) {
      return new AppError("É necessário informar a Data!");
    } else if (!startTime) {
      return new AppError("É necessário informar o Hora de Início!");
    }

    const duration = getDuration(startTime, stopTime);
    
    if (duration < 0) {
      return new AppError("O horário do termino deve ser maior que o horário inicial!");
    }
    
    const stats = duration > 0 ? ActivityStats.Finished : ActivityStats.InProgress;
    const tagsInArray = getTagsInArray(tags);

    const repo = AppDataSource.getRepository(Activity);
    const activity = await repo.findOne({ where: { id, user_id } });

    if (!activity) {
      return new AppError("Atividade não localizada!");
    }

    activity.description = description;
    activity.stats = stats;
    activity.duration = duration;
    activity.date = date;
    activity.startTime = startTime;
    activity.stopTime = stopTime;
    activity.tags = tagsInArray;

    await repo.save(activity);
  }
}