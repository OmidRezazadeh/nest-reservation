import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository){}
    store(data: any){
        return this.userRepository.create(data);
    }
}
