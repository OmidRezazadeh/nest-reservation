import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity'; // Adjust the path
import { SeederController } from './seeder.controller';
import { RolesModule } from "src/roles/roles.module";
@Module({
    imports: [RolesModule], // Make RoleRepository available
    providers: [SeederService],
    exports: [SeederService],
    controllers: [SeederController],
})
export class SeederModule {}
