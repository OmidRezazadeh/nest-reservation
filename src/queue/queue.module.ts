import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bullmq';
import { QueueProcessor } from './queue.processor';
import {NotificationProcessor} from './notification.processor'
@Module({
  imports:[
    BullModule.forRoot({
      connection:{
        host:'localhost',
        port: 6379,
      }
    }),
  BullModule.registerQueue(
    {
          name:"myQueue"
  },
  {
    name:"myNotification"
  }
)
  ],
  providers:[QueueService,QueueProcessor,NotificationProcessor],
  exports:[QueueService]
})
export class QueueModule {}
