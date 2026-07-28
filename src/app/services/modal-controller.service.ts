import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { TaskCommentsModalComponent } from '../components/task-comments-modal/task-comments-modal.component';
import { TaskFormModalComponent } from '../components/task-form-modal/task-form-modal.component';
import { ITaskFormControls } from '../interfaces/task-form-controls.interface';
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalControllerService {
  private readonly _dialog = inject(Dialog);
  private readonly modalSizeOptions = {
    maxWidth: '620px',
    width: '95%',
    disableClose: true,
  };

  openNewTaskModal() {
    return this._dialog.open<ITaskFormControls>(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      data: { mode: 'create', formValues: { name: '', description: '' } },
    });
  }

  openEditTaskModal(formValues: ITaskFormControls) {
    return this._dialog.open<ITaskFormControls>(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      data: { mode: 'edit', formValues },
    });
  }

  openTaskCommentsModal(task: ITask) {
    return this._dialog.open(TaskCommentsModalComponent, {
      ...this.modalSizeOptions,
      data: task,
    });
  }
}
