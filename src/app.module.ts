import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullCronModule } from './bull-cron/bull-cron.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullCronModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
