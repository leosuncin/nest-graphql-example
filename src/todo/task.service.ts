import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  createOne(title: string) {
    const task = this.taskRepository.create({ title });

    return this.taskRepository.save(task);
  }

  async getOne(id: Task['id']) {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) throw new NotFoundException('Task not exist');

    return task;
  }

  listAll() {
    return this.taskRepository.find();
  }

  async updateOne(
    id: Task['id'],
    changes: Partial<Pick<Task, 'title' | 'completed'>>,
  ) {
    const task = await this.getOne(id);

    this.taskRepository.merge(task, changes);

    return this.taskRepository.save(task);
  }

  async removeOne(id: Task['id']) {
    const task = await this.getOne(id);

    return this.taskRepository.remove(task);
  }
}
