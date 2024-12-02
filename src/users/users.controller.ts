import { Controller, Get, Post,Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("/api/v1/users")
export class UsersController {
 constructor(private readonly usersService: UsersService){}
  @Post('register')
  register(@Body() createUserDto:CreateUserDto) {
   return this.usersService.store(createUserDto);
  }
  @Get("list")
  list() {
   const users = this.usersService.findAll();
   return users;
  }
 

}
