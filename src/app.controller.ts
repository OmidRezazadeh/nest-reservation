import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TaskService } from './task.service';


@Controller('tasks')
export class AppController {
  constructor(
    private readonly appService: AppService,


  ) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

 
}
