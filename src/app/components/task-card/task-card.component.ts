import { Component, inject, Input } from '@angular/core';
import { ITask } from '../../interfaces/task.interface';
import { ModalControllerService } from '../../services/modal-controller.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: ITask;

  private readonly _modalControllerService = inject(ModalControllerService);
  private readonly _taskService = inject(TaskService);

  openEditTaskModal() {
    const dialogRef = this._modalControllerService.openEditTaskModal({
      name: this.task.name,
      description: this.task.description,
    });

    dialogRef.closed.subscribe((formValues) => {
      if (formValues) {
        this._taskService.updateTask(
          this.task.id,
          this.task.status,
          formValues.name,
          formValues.description,
        );
      }
    });
  }
}
