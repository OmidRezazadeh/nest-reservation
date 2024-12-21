import { Body, Controller, Get, HttpException, Post, UseGuards } from '@nestjs/common';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from '../users/users.service';

import { LoginDto } from './dto/Login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService,
    private  jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: createUserDto) {
    const userExists = await this.usersService.userExists(createUserDto.email);
    if (userExists) {
      throw new HttpException(`User already exists`,400);
    }
    const user = await this.usersService.createUser(createUserDto);
    return user;

  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    
    const user = await this.usersService.userExists(loginDto.email);
    if (!user) {
      throw new HttpException(`User not found`,404);
    }
     const isPasswordMath = await bcrypt.compare(
      loginDto.password,
      user.password
     )
     if(!isPasswordMath){
      throw new HttpException(`Password is incorrect`,400);
     }

     const accessToken =this.jwtService.sign({
      sub:user.id,
      email:user.email
     })
     return {
      accessToken:accessToken,

     }


  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  getProfile() {
     return 'test';
  }
}

