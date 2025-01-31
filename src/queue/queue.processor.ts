import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('myQueue')
export class QueueProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    console.log(`Processing job with ID: ${job.id}`);
  }

  @OnWorkerEvent('completed')
  async onCompleted(job: Job) {
    console.log(`✅ Job ${job.id} completed successfully! job data`);
  }

}
