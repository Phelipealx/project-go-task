import { Component, inject, Input } from '@angular/core';
import { ITask } from '../../interfaces/task.interface';
import { ModalControllerService } from '../../services/modal-controller.service';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: ITask;

  private readonly _modalControllerService = inject(ModalControllerService);

  openEditTaskModal() {
    const dialogRef = this._modalControllerService.openEditTaskModal({
      name: 'Sample Task',
      description: 'This is a sample task.',
    });

    dialogRef.closed.subscribe((formValues) => {
      console.log('Modal edit task closed with form values:', formValues);
    });
  }
}
