import { User } from '../../entities/User';
import { AppError } from '../../../../errors/AppError';
import { AppDataSource } from '../../../../data-source';
import { validCpfCnpj } from '../../../../utils/ValidCpfCnpj';
import { removeMaskCpfCnpj } from '../../../../utils/RemoveMaskCpfCnpj';

interface IUpdateUser {
  id: number;
  name: string;
  email?: string;
  type: string;
}

export class UpdateUserService {
  async execute({ id, email, name, type }: IUpdateUser): Promise<IUpdateUser | AppError> {
    if (!id) {
      return new AppError("É necessário informar o Id do usuário!");
    }

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id }});

    if (!user) {
      return new AppError("Usuário não localizado!");
    }

    user.name = name ? name.toUpperCase() : user.name;
    user.email = email ? email : user.email;
    user.type = type ? type : user.type;

    await repo.save(user);

    const userReturn: IUpdateUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type
    }

    return userReturn;
  }
}