import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity"
import { Repository } from "typeorm";
import { UserRepository } from "src/users/user.repository";
@Injectable()
export class AuthService {
constructor( private readonly usersRepository: UserRepository) {
}
  register(data:any){
      return this.usersRepository.store(data)
  }
}
