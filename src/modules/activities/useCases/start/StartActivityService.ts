import { AppError } from '../../../../errors/AppError';
import { AppDataSource } from "../../../../data-source";
import { Activity } from "../../entities/Activity";
import { ActivityStats } from "../../entities/ActivityStats";
import { getDuration, getTagsInArray } from "../../../../utils/Utils";

interface StartActivityRequest {
  id: number
}

export class StartActivityService {
  async execute({ id }: StartActivityRequest): Promise<AppError | null>{
    if (!id) {
      return new AppError("É necessário informar o ID da Atividade!");
    }

    const repo = AppDataSource.getRepository(Activity);
    const activity = await repo.findOne({ where: { id } });

    if (!activity) {
      return new AppError("Atividade não localizada!");
    }

    activity.stats = ActivityStats.InProgress;
    activity.duration = 0;
    activity.stopTime = "";

    await repo.save(activity);
  }
}