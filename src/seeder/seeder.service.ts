import { Injectable } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
      ) {}


    async seedRoles(){
        const roles=[
            { name:'Admin'},
            { name:'User' },
            { name:'Moderator'},
        ]
        for (let role  of roles) {
            const exits = await this.roleRepository.findOneBy({name: role.name});
            if (!exits) {
                await this.roleRepository.save(role);
            }
        }
        console.log('Roles seeded successfully!');


    }
}
