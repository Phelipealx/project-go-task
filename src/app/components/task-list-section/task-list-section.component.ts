import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { ITask } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import { AsyncPipe } from '@angular/common';
import { TaskStatus } from '../../types/task-status';
import { TaskStatusEnum } from '../../enums/task-status.enum';

@Component({
  selector: 'app-task-list-section',
  imports: [TaskCardComponent, CdkDropList, CdkDrag, AsyncPipe],
  templateUrl: './task-list-section.component.html',
  styleUrls: ['./task-list-section.component.css'],
})
export class TaskListSectionComponent {
  protected readonly _taskService = inject(TaskService);

  protected onCardDrop(event: CdkDragDrop<ITask[]>) {
    this.moveCardToColumn(event);

    const taskId = event.item.data.id;
    const taskCurrentStatus = event.item.data.status;
    const droppedColumn = event.container.id;

    this.updateTaskStatus(taskId, taskCurrentStatus, droppedColumn);
  }

  private updateTaskStatus(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    droppedColumn: string,
  ) {
    let taskNextStatus: TaskStatus;

    switch (droppedColumn) {
      case 'to-do-column':
        taskNextStatus = TaskStatusEnum.TODO;
        break;
      case 'doing-column':
        taskNextStatus = TaskStatusEnum.DOING;
        break;
      case 'done-column':
        taskNextStatus = TaskStatusEnum.DONE;
        break;
      default:
        throw Error(`Unhandled column: ${droppedColumn}`);
    }

    this._taskService.updateTaskStatus(
      taskId,
      taskCurrentStatus,
      taskNextStatus,
    );
  }

  private moveCardToColumn(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
