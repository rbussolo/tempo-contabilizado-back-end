import { Between } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { Calendar } from "../../entities/Calendar";
import { CalendarStats } from "../../entities/CalendarStats";
import { ActivityStats } from "../../../activities/entities/ActivityStats";


interface IUpdateService {
  id: number;
}

export class UpdateCalendarService {
  async execute({ id }: IUpdateService): Promise<void> {
    if(!id) return;

    const repo = AppDataSource.getRepository(Calendar);
    const calendar = await repo.findOne({ where: { id }, relations: ['activities'] });
    
    if(!calendar) return;

    const existActivity = calendar.activities.length;
    const existActivityWithProblem = calendar.activities.filter(activity => activity.stats === ActivityStats.InProgress).length;

    if (existActivityWithProblem) {
      calendar.stats = CalendarStats.ActivityWithProblem;
    } else if (existActivity) {
      calendar.stats = CalendarStats.HasActivity;
    } else {
      calendar.stats = CalendarStats.NoActivity;
    }

    await repo.save(calendar);
  }
}