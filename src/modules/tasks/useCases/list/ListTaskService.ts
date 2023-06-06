import { ObjectLiteral } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { Task } from "../../entities/Task";

interface ITasks {
  tasks: ObjectLiteral[];
  count: number;
}

export class ListTaskService {
  async execute({ user_id, activity_id }): Promise<ITasks> {
    const repo = AppDataSource.getRepository(Task);
    const query = repo.createQueryBuilder("tasks")
      .from("tasks", "t")
      .innerJoin("activities", "a", "a.id = t.activity_id")
      .select("t.id")
      .addSelect("t.description")
      .addSelect("t.startTime")
      .addSelect("t.stopTime")
      .addSelect("t.duration")
      .addSelect("t.stats")
      .where("a.id = :activity_id", { activity_id })
      .andWhere("a.user_id = :user_id", { user_id })
      .orderBy("t.id", "DESC");
    
    const tasks = await query.getMany();
    const count = await query.getCount();

    return { tasks, count };
  }
}