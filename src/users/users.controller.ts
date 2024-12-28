import { Controller, Get, Post,Body, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
 constructor(private readonly usersService: UsersService){}
  @Post('register')
  register( ) {

  }
  @Get('expired-test')
  async getExpiredProducts(@Param('id',ParseIntPipe) id: number) {
console.log(id);
    // throw new NotFoundException("Not found  users1111");
 
  }


}
