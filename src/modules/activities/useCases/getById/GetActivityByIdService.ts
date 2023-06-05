import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { Activity } from "../../entities/Activity";

interface GetActivityByIdRequest {
  user_id: number;
  id: number
}

export class GetActivityByIdService {
  async execute({ user_id, id }: GetActivityByIdRequest): Promise<Activity | AppError> {
    const repo = AppDataSource.getRepository(Activity);
    const activity = await repo.findOne({ where: { id, user_id } });

    if (!activity) {
      return new AppError("Atividade não localizada!");
    }

    return activity;
  }
}