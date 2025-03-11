import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.taskRepository.save(createTaskDto);
  }

  async findAll() {
    const data = await this.taskRepository.findAndCount();
    return {
      count: data[1],
      data: data[0],
    };
  }

  async findOne(id: number) {
    const data = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    if (!data) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return data;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const data = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    if (!data) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    await this.taskRepository.update(id, updateTaskDto);

    return {
      message: `Task with id ${id} updated successfully`,
      data: await this.taskRepository.findOne({
        where: {
          id,
        },
      }),
    };
  }

  async remove(id: number) {
    const data = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    if (!data) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    await this.taskRepository.delete(id);

    return {
      message: `Task with id ${id} deleted successfully`,
    };
  }
}
