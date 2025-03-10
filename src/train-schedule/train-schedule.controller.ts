import { Controller, Get, Post, Body, Param, Put, Patch, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TrainScheduleService } from './train-schedule.service';
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import { UpdateTrainScheduleDto } from './dto/update-train-schedule.dto';
import { JwtAuthGuard } from '../auth/guards/local-auth.guard';

@ApiTags('trains')
@ApiBearerAuth()
@Controller('trains')
export class TrainScheduleController {
  constructor(private readonly trainScheduleService: TrainScheduleService) {}

  @ApiOperation({ summary: 'Get all train schedules' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: string,
  ) {
    const query = { search, sortBy, order };
    return this.trainScheduleService.findAll(query);
  }

  @ApiOperation({ summary: 'Create a new train schedule' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createDto: CreateTrainScheduleDto) {
    return this.trainScheduleService.create(createDto);
  }

  @ApiOperation({ summary: 'Get a train schedule by ID' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.trainScheduleService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a train schedule completely (PUT)' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateFull(@Param('id') id: number, @Body() updateDto: CreateTrainScheduleDto) {
    return this.trainScheduleService.updateFull(id, updateDto);
  }

  @ApiOperation({ summary: 'Partially update a train schedule (PATCH)' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updatePartial(@Param('id') id: number, @Body() updateDto: UpdateTrainScheduleDto) {
    return this.trainScheduleService.updatePartial(id, updateDto);
  }

  @ApiOperation({ summary: 'Delete a train schedule' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.trainScheduleService.delete(id);
    return { message: 'Train schedule deleted successfully' };
  }
}
