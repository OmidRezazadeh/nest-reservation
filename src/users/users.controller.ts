import { Controller, Get, Post,Body } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("/api/v1/users")
export class UsersController {
 constructor(private readonly usersService: UsersService){}
  @Post('register')
  register( ) {

  }


}
