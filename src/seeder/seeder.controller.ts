import { Controller, Get, Post } from "@nestjs/common";
import { SeederService } from "src/seeder/seeder.service";

@Controller('seeders')
export class SeederController {
    constructor(private readonly seederService: SeederService  ) {}
    @Post('seeder-role')
    async storeRole(){
        return await  this.seederService.seedRoles();
    }

}
