import { AppError } from '../../../../errors/AppError';
import { AppDataSource } from "../../../../data-source";
import { Activity } from "../../entities/Activity";
import { ActivityStats } from "../../entities/ActivityStats";
import { getDuration, getTagsInArray } from "../../../../utils/Utils";

interface StopActivityRequest {
  user_id: number;
  id: number
}

export class StopActivityService {
  async execute({ user_id, id }: StopActivityRequest): Promise<AppError | null>{
    if (!user_id) {
      return new AppError("É necessário informar o ID do Usuário!");
    } else if (!id) {
      return new AppError("É necessário informar o ID da Atividade!");
    }

    const repo = AppDataSource.getRepository(Activity);
    const activity = await repo.findOne({ where: { id, user_id } });

    if (!activity) {
      return new AppError("Atividade não localizada!");
    }

    const d = new Date();

    activity.stats = ActivityStats.Finished;
    activity.stopTime = d.getHours().toString().padStart(2, '0') + ":" + d.getMinutes().toString().padStart(2, '0');
    activity.duration = getDuration(activity.startTime, activity.stopTime);

    await repo.save(activity);
  }
}