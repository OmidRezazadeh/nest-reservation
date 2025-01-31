 import { OnWorkerEvent, Processor, WorkerHost  } from "@nestjs/bullmq";
 import { Job } from 'bullmq';


@Processor('myNotification')

export class NotificationProcessor extends WorkerHost{

    async process(job: Job){
        console.log('Processing notification job  with data:', job.id);
    }
    @OnWorkerEvent('completed')
    onCompleted(job: Job) {
        console.log(`Job ${job.id} completed! notifications `);
      }
      @OnWorkerEvent('failed')
      OnFailed(job:Job, error:Error){
        console.error(`❌ Job ${job.id} failed with error:`, error.message);
      }
}