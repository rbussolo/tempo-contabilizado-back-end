import { AppError } from '../../../../errors/AppError';
import { AppDataSource } from "../../../../data-source";
import { Activity } from "../../entities/Activity";
import { ActivityStats } from "../../entities/ActivityStats";
import { getDuration, getTagsInArray } from "../../../../utils/Utils";
import { UpdateCalendarService } from '../../../calendar/useCases/update/UpdateCalendarService';

interface StartActivityRequest {
  user_id: number;
  id: number
}

export class StartActivityService {
  async execute({ user_id, id }: StartActivityRequest): Promise<AppError | null>{
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

    activity.stats = ActivityStats.InProgress;
    activity.duration = 0;
    activity.stopTime = "";

    await repo.save(activity);

    const updateCalendarService = new UpdateCalendarService();
    await updateCalendarService.execute({ id: activity.calendar_id });
  }
}