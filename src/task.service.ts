import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
@Injectable()
export class TaskService{
    private readonly logger = new Logger(TaskService.name);
    constructor(
      private schedulerRegistry: SchedulerRegistry
    ) {}
    

    
    addCronJob(name: string, cronTime: string) {
      const job = new CronJob(cronTime, () => {
      this.logger.log(`Dynamic Cron job "${name}" executed`);
      });
      this.schedulerRegistry.addCronJob(name, job);
      job.start();
      this.logger.log(`Dynamic Cron job ${name} added with schedule ${cronTime}`);
    }
  
    





  // @Cron(CronExpression.EVERY_30_SECONDS, {name:'slipknot'})
  // handelCorn(){
  //   this.logger.log('Executing task every 10 seconds corn');
  // }

  // @Interval(5000)
  // handleInterval() {
  //   this.logger.log('Executing task every 5 seconds interval');
  // }

  // @Timeout(10000)
  // handleTimeout() {
  //   this.logger.log('Executed task after 10 seconds');
  // }

}


