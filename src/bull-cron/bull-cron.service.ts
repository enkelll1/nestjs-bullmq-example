import { BadRequestException, Injectable } from '@nestjs/common';
import {
  BullQueueEvents,
  InjectQueue,
  OnQueueActive,
  OnQueueError,
  OnQueueEvent,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job, Queue } from 'bull';

@Injectable()
@Processor('my-queue')
export class BullCronService {
  constructor(@InjectQueue('my-queue') private queue: Queue) {}

  async sendJobMessageOne() {
    await this.queue.add(
      'job1',
      {
        text: 'Job created activated and finished successfully',
      },
      {
        repeat: {
          cron: '30 04 * * *',
        },
        //ne qofte se e do ta ekzekutosh vetem nje her jobin
        //repeat:null
        //ne qofte se e do ta ekzekutosh vetem nje her ne sekond
        //repeat:{
        //every: '1 second'
        //}
        delay: new Date('2023-03-03T04:30:00.000Z').getTime(),
      },
    );
  }

  @OnQueueActive()
  async onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @Process('job1')
  async readOperationJob1(job: Job) {
    // shkruaj funksjonin qe do te besh per job1
  }

  @OnQueueEvent(BullQueueEvents.COMPLETED)
  onCompleted(job: Job) {
    console.log(
      `Completed job ${job.id} of type ${job.name} with result ${job.returnvalue}`,
    );
  }

  @OnQueueFailed()
  onFailed(job: Job) {
    console.log(`Failed job ${job.id} of type ${job.name}`);
  }

  @OnQueueError()
  onError(job: Job) {
    console.log(`Error job ${job.id} of type ${job.name}`);
  }
}
