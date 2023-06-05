import { AppError } from '../../../../errors/AppError';
import { AppDataSource } from "../../../../data-source";
import { Activity } from "../../entities/Activity";
import { ActivityStats } from "../../entities/ActivityStats";
import { getDuration, getTagsInArray } from "../../../../utils/Utils";

interface StopActivityRequest {
  id: number
}

export class StopActivityService {
  async execute({ id }: StopActivityRequest): Promise<AppError | null>{
    if (!id) {
      return new AppError("É necessário informar o ID da Atividade!");
    }

    const repo = AppDataSource.getRepository(Activity);
    const activity = await repo.findOne({ where: { id } });

    if (!activity) {
      return new AppError("Atividade não localizada!");
    }

    const d = new Date();

    console.log(activity);

    activity.stats = ActivityStats.Finished;
    activity.stopTime = d.getHours().toString().padStart(2, '0') + ":" + d.getMinutes().toString().padStart(2, '0');
    activity.duration = getDuration(activity.startTime, activity.stopTime);

    await repo.save(activity);
  }
}