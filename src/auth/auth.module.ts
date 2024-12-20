import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as process from "node:process";
import { UsersService } from "src/users/users.service";
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/users/user.repository';
@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    })
  ],
  providers: [AuthService,UsersService,UserRepository,JwtService],
  controllers: [AuthController],

})
export class AuthModule {}
