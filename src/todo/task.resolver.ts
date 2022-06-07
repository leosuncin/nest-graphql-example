import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Task } from './task.entity';
import { TaskService } from './task.service';
import { UpdateTask } from './update-task.dto';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  addTask(@Args('title') title: string) {
    return this.taskService.createOne(title);
  }

  @Query(() => [Task])
  tasks() {
    return this.taskService.listAll();
  }

  @Mutation(() => Task)
  updateTask(
    @Args('id', { type: () => ID }) id: Task['id'],
    @Args('updateTaskInput') changes: UpdateTask,
  ) {
    return this.taskService.updateOne(id, changes);
  }

  @Mutation(() => Task)
  deleteTask(@Args('id', { type: () => ID }) id: Task['id']) {
    return this.taskService.removeOne(id);
  }
}
