import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import { UpdateTrainScheduleDto } from './dto/update-train-schedule.dto';
import { TrainSchedule } from './entities/train-schedule.entity';

@Injectable()
export class TrainScheduleService {
  constructor(
    @InjectRepository(TrainSchedule)
    private trainScheduleRepository: Repository<TrainSchedule>,
  ) {}

  async findAll(query: { search?: string; sortBy?: string; order?: string }): Promise<TrainSchedule[]> {
    const { search, sortBy, order } = query;
    const qb = this.trainScheduleRepository.createQueryBuilder('train');

    if (search) {
      qb.where('(train.trainNumber ILIKE :search)', { search: `%${search}%` })
        .orWhere('(train.origin ILIKE :search)', { search: `%${search}%` })
        .orWhere('(train.destination ILIKE :search)', { search: `%${search}%` });

      qb.addOrderBy(
        `CASE WHEN train.trainNumber ILIKE :exactSearch THEN 1 ELSE 2 END`,
        'ASC'
      ).setParameters({ exactSearch: search });
    }

    if (sortBy) {
      const sortOrder = order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      qb.addOrderBy(`train.${sortBy}`, sortOrder);
    }

    return qb.getMany();
  }

  async findOne(id: number): Promise<TrainSchedule> {
    const train = await this.trainScheduleRepository.findOne({ where: { id } });
    if (!train) {
      throw new NotFoundException(`Train schedule with ID ${id} not found`);
    }
    return train;
  }

  async create(createDto: CreateTrainScheduleDto): Promise<TrainSchedule> {
    const train = this.trainScheduleRepository.create(createDto);
    return this.trainScheduleRepository.save(train);
  }

  async updateFull(id: number, updateDto: CreateTrainScheduleDto): Promise<TrainSchedule> {
    const train = await this.findOne(id);

    if (
      updateDto.trainNumber === undefined ||
      updateDto.departure === undefined ||
      updateDto.arrival === undefined ||
      updateDto.origin === undefined ||
      updateDto.destination === undefined
    ) {
      throw new BadRequestException('All fields must be provided for a full update.');
    }

    train.trainNumber = updateDto.trainNumber;
    train.departure = updateDto.departure;
    train.arrival = updateDto.arrival;
    train.origin = updateDto.origin;
    train.destination = updateDto.destination;
    return this.trainScheduleRepository.save(train);
  }

  async updatePartial(id: number, updateDto: UpdateTrainScheduleDto): Promise<TrainSchedule> {
    const train = await this.findOne(id);
    const updated = Object.assign(train, updateDto);

    return this.trainScheduleRepository.save(updated);
  }

  async delete(id: number): Promise<void> {
    const result = await this.trainScheduleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Train schedule with ID ${id} not found`);
    }
  }
}
