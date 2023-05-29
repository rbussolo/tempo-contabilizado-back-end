import { compare, hash } from "bcryptjs";

import { AppDataSource } from "../../../../../data-source";
import { AppError } from "../../../../../errors/AppError";
import { PasswordError } from "../../../../../errors/PasswordError";
import { validPassword } from "../../../../../utils/ValidPassword";
import { User } from "../../../entities/User";

interface UpdatePassword {
  id: number;
  actualPassword: string;
  newPassword: string;
  newPasswordAgain: string;
}

export class UpdatePasswordService {
  async execute({ id, actualPassword, newPassword, newPasswordAgain }: UpdatePassword): Promise<AppError | PasswordError>{
    if (!id) {
      return new AppError("É necessário informar o Id do Usuário!");
    } else if (!actualPassword) {
      return new AppError("É necessário informar a Senha Atual!");
    } else if (!newPassword) {
      return new AppError("É necessário informar a Nova Senha!");
    } else if (!newPasswordAgain) {
      return new AppError("É necessário informar a Confirmação da Senha!");
    } else if (newPassword != newPasswordAgain) {
      return new AppError("A Confirmação da Senha deve ser igual a Nova Senha!");
    } 

    const passwordValid = validPassword(newPassword);

    if (!passwordValid.valid) {
      return new PasswordError("A senha não esta no padrão necessário!", passwordValid.messages);
    }

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id } });

    if (!user) {
      return new AppError("Usuário não localizado!");
    }

    // Check if password is correct
    const passwordMatch = await compare(actualPassword, user.password);

    if (!passwordMatch) {
      return new AppError("Senha Atual informada esta incorreta!");
    }

    // Generate password
    const passwordHash = await hash(newPassword, 8);

    user.password = passwordHash;

    await repo.save(user);
  }
}