import { Controller, Get, Post,Body, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { DateService } from '../date/DateService';
import { get } from "http";
import { User } from "./entities/user.entity";
import { DataSource } from 'typeorm';

@Controller("users")
export class UsersController {
 constructor(
  private readonly usersService: UsersService,
  private readonly dateService:DateService

 ){}
 @Get('date')
 async getJalaliDate(){
   const getCurrentJalaliDate = this.dateService.getCurrentJalaliDate();

   const user = await this.usersService.findOne(17);
   const data: string = new Date(user.created_at).toISOString();
               const getdata = this.dateService.convertToJalali(data);
  return {user,getdata}
   
   
 }
        

  @Post('register')
  register( ) {

  }
  @Get('expired-test')
  async getExpiredProducts(@Param('id',ParseIntPipe) id: number) {
console.log(id);
    // throw new NotFoundException("Not found  users1111");
 
  }
  


}
