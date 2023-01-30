import { Controller, Get } from "@nestjs/common";
import { BullCronService } from "./bull-cron.service";

@Controller('bull-cron')
export class BullCronController {
  constructor(private readonly bullCron: BullCronService) {}

  @Get('/job1')
  getJobOne() {
    return this.bullCron.sendJobMessageOne();
  }

  @Get('/job2')
  getJobTwo() {
    return this.bullCron.sendJobMessageOne();
  }
}
