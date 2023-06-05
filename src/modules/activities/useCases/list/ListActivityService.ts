import { AppDataSource } from "../../../../data-source";
import { queryParamToDate } from "../../../../utils/QueryParams";
import { Activity } from "../../entities/Activity";

interface Activities {
  activities: Activity[];
  count: number;
}

export class ListActivityService {
  async execute({ user_id, date, month, year }): Promise<Activities> {
    const repo = AppDataSource.getRepository(Activity);
    const d = queryParamToDate(date);

    let query = repo.createQueryBuilder("activities")
      .select("activities.id")
      .addSelect("activities.description")
      .addSelect("activities.date")
      .addSelect("activities.startTime")
      .addSelect("activities.stopTime")
      .addSelect("activities.duration")
      .addSelect("activities.stats")
      .addSelect("activities.tags");

    query.andWhere("user_id = :user_id", { user_id });

    if (date && d) {
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();

      query = query.andWhere("extract(day from activities.date) = :day", { day });
      query = query.andWhere("extract(month from activities.date) = :month", { month });
      query = query.andWhere("extract(year from activities.date) = :year", { year });
    }

    if (month) {
      query = query.andWhere("extract(month from activities.date) = :month", { month });
    }
    
    if (year) {
      query = query.andWhere("extract(year from activities.date) = :year", { year });
    }

    query = query.orderBy("activities.id", "DESC");
    
    const activities = await query.getMany();
    const count = await query.getCount();

    return { activities, count };
  }
}