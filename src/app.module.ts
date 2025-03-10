import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainScheduleModule } from './train-schedule/train-schedule.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'aws-0-eu-central-1.pooler.supabase.com',
      port: Number(process.env.DB_PORT) || 6543,
      username: process.env.DB_USER || 'postgres.vroddvdzordaolpxboyb',
      password: process.env.DB_PASS || 'strong_password)',
      database: process.env.DB_NAME || 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TrainScheduleModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
