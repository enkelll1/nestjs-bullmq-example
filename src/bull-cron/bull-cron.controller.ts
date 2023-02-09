import { Controller, Get } from '@nestjs/common';
import { BullCronService } from './bull-cron.service';

@Controller('bull-cron')
export class BullCronController {
  constructor(private readonly bullCron: BullCronService) {}

  @Get('/job1')
  getJobOne() {
    console.log(new Date('2023-03-03T04:30:00.000Z').getTime());
    return this.bullCron.sendJobMessageOne();
  }
}
