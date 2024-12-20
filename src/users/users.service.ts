import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/roles/enums/roles.enums';

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
            roleId: UserRole.USER,
            email: data.email
        };
        
        return this.usersRepository.store(userData);
    }
}
