import { Module } from '@nestjs/common';
import { BullCronController } from './bull-cron.controller';
import { BullCronService } from './bull-cron.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'my-queue',
    }),
  ],
  controllers: [BullCronController],
  providers: [BullCronService],
})
export class BullCronModule {}
