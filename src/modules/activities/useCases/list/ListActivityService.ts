import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { queryParamToDate } from "../../../../utils/QueryParams";
import { Activity } from "../../entities/Activity";

interface Activities {
  activities: Activity[];
  count: number;
}

export class ListActivityService {
  async execute({ user_id, date, date_initial, date_final }): Promise<Activities> {
    const repo = AppDataSource.getRepository(Activity);
    
    if (date) {
      const activities = await repo.find({ where: { user_id, date }, relations: ['tasks'], order: { startTime: "DESC" } });
      const count = activities.length;

      return { activities, count };
    }

    const activities = await repo.find({ where: { user_id, date: Between(date_initial, date_final) }, relations: ['tasks'], order: { date: "ASC", startTime: "DESC" } });
    const count = activities.length;

    return { activities, count };
    
    /*
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
    */
  }
}