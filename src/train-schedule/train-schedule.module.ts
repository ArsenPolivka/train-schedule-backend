import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainScheduleService } from './train-schedule.service';
import { TrainScheduleController } from './train-schedule.controller';
import { TrainSchedule } from './entities/train-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainSchedule])],
  providers: [TrainScheduleService],
  controllers: [TrainScheduleController],
})
export class TrainScheduleModule {}
