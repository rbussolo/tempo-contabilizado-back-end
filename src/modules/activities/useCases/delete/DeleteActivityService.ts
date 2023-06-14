import { AppError } from '../../../../errors/AppError';
import { AppDataSource } from "../../../../data-source";
import { Activity } from "../../entities/Activity";
import { ActivityStats } from "../../entities/ActivityStats";
import { getDuration, getTagsInArray } from "../../../../utils/Utils";
import { UpdateCalendarService } from '../../../calendar/useCases/update/UpdateCalendarService';

interface DeleteActivityRequest {
  user_id: number;
  id: number;
}

export class DeleteActivityService {
  async execute({ user_id, id }: DeleteActivityRequest): Promise<AppError | null>{
    if (!user_id) {
      return new AppError("É necessário informar o Id do Usuário!");
    } else if (!id) {
      return new AppError("É necessário informar o Id da Atividade!");
    }
    
    const repo = AppDataSource.getRepository(Activity);
    const activity = await repo.findOne({ where: { id, user_id } });
    const calendar_id = activity.calendar_id;

    if (!activity) {
      return new AppError("Atividade não localizada!");
    }

    const result = await repo.delete(id);

    const updateCalendarService = new UpdateCalendarService();
    await updateCalendarService.execute({ id: calendar_id });
  }
}