import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UserRepository,
    ){}
  
    async userExists(email: string) {
        return this.usersRepository.findByEmail(email);
    }

    async createUser(data: any) {
      const hashPassword = await bcrypt.hash(data.password, 10);

        const userData = {
            name: data.name,
            password: hashPassword,
            roleId: 1,
            email: data.email
        };
        
        return this.usersRepository.store(userData);
    }
}
