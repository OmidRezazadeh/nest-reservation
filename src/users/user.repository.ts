import {  Repository } from 'typeorm';
import { User } from './entities/user.entity';


export class UserRepository extends Repository<User>{
store(data: any){
       return this.create(data);
}
}