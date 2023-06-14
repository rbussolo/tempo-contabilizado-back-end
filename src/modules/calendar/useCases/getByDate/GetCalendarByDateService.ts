import { Between } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { Calendar } from "../../entities/Calendar";
import { CalendarStats } from "../../entities/CalendarStats";


interface IGetByDate {
  user_id: number;
  date: Date;
}

export class GetCalendarByDateService {
  async execute({ user_id, date }: IGetByDate): Promise<Calendar> {
    const repo = AppDataSource.getRepository(Calendar);
    const calendar = await repo.findOne({ where: { user_id, date } });
    
    if(!calendar){
      // Create a new register with this date
      const calendar = repo.create({
        date,
        stats: CalendarStats.NoActivity,
        user_id
      });

      return await repo.save(calendar);
    }

    // Return calendar finded at database
    return calendar;
  }
}