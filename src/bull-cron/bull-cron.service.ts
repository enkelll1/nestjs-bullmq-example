import { BadRequestException, Injectable } from '@nestjs/common';
import {
  BullQueueEvents,
  InjectQueue,
  OnQueueActive,
  OnQueueError,
  OnQueueEvent,
  OnQueueFailed,
} from '@nestjs/bull';
import { Job, Queue } from 'bull';

@Injectable()
export class BullCronService {
  constructor(@InjectQueue('my-queue') private queue: Queue) {}

  async sendJobMessageOne() {
    //
    await this.queue.add(
      'job1',
      {
        text: 'Job created activated and finished successfully',
      },
      {
        repeat: {
          cron: '30 04 * * *',
        },
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

  @Process('job2')
  async readOperationJob2(job: Job) {
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
