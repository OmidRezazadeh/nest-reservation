import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
    constructor(@InjectQueue('myQueue') private myQueue: Queue) {}

    async addJob(data:any){
        await this.myQueue.add('myJob',data);
    }
}

