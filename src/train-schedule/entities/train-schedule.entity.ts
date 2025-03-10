import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TrainSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trainNumber: string;

  @Column('timestamp')
  departure: Date;

  @Column('timestamp')
  arrival: Date;

  @Column()
  origin: string;

  @Column()
  destination: string;
}
