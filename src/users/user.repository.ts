import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { find } from 'rxjs';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) {}

    async findByEmail(email: string) {
        return this.repository.findOne({
            where: { email: email },
        });
    }

    async store(data: any) {
        const user = this.repository.create(data);
        return this.repository.save(user);
    }
     async findOne(id:number){
         return await this.repository.findOne({
            where:{id:id}
     })
     }
     
     async find(){
        return await this.repository.find();
     }
     
}