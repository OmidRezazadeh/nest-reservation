import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(
 private readonly usersRepository: UserRepository,
    ){
         
    }
     store(data: any){
       const existUser = this.usersRepository.findByEmail(data.email);
       if(existUser){
         
       }
    }
}
