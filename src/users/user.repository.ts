import {  Repository } from 'typeorm';
import { User } from './entities/user.entity';


export class UserRepository extends Repository<User>{
 async  findByEmail(email: string) {
        return await this.findOne({
               where: { email: email },
        });
 };
       store(data: any){
       return this.create(data);
}
}