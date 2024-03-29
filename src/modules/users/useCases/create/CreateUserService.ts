import { hash } from "bcryptjs";

import { AppError } from '../../../../errors/AppError';
import { AppDataSource } from "../../../../data-source";
import { User } from "../../entities/User";
import { validEmail } from '../../../../utils/ValidEmail';
import { validPassword } from "../../../../utils/ValidPassword";
import { PasswordError } from "../../../../errors/PasswordError";

interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  type?: string;
}

export class CreateUserService {
  async execute({ email, password, name, type }: CreateUserRequest): Promise<User | AppError | PasswordError>{
    // Check everything that is necessary has informed
    if (!email) {
      return new AppError("É necessário informar o E-mail!");
    } else if (!password) {
      return new AppError("É necessário informar a Senha!");
    } else if (!name) {
      return new AppError("É necessário informar o Nome!");
    } else if (!validEmail(email)) {
      return new AppError("O E-mail informado é inválido!");
    } 
    
    const passwordValid = validPassword(password);

    if (!passwordValid.valid) {
      return new PasswordError("A Senha informada é inválida!", passwordValid.messages);
    }

    const repo = AppDataSource.getRepository(User);

    // Check if already has a user with this e-mail
    const userExists = await repo.findOne({ where: { email }});
    
    if(userExists){
      return new AppError("Já existe um usuário cadastrado com este e-mail.");
    }

    // Generate password
    const passwordHash = await hash(password, 8);

    const user = repo.create({
      email: email.toLowerCase(),
      password: passwordHash,
      name: name.toUpperCase(),
      type
    });

    await repo.save(user);

    return user;
  }
}