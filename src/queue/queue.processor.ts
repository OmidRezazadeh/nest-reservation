import { Processor, WorkerHost, } from '@nestjs/bullmq';
import { Job } from 'bullmq';


@Processor('myQueue')
export class QueueProcessor extends WorkerHost {
    
    
    async process(job: Job) {
        console.log('Processing job with data:', job.id);
      }

  
      onCompleted(job: Job) {
        console.log(`Job ${job.id} completed!`);
      }

}