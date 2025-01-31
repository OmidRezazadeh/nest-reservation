import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
    constructor(
        @InjectQueue('myQueue') private readonly myQueue: Queue,
        @InjectQueue('myNotification') private NotificationQueue :Queue  
    ) {}
    

    async addJob(data:any){
        await this.myQueue.add('myJob',data,{priority:6});
    } 
    async addNotification(data:any){
         await this.NotificationQueue.add('myNotification',data, {priority:1});
    }
}

