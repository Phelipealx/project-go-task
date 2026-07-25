import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IComment } from '../../interfaces/comment.interface';
import { ITask } from '../../interfaces/task.interface';
import { generateUniqueIdWithTimestamp } from '../../utils/generate-unique-id-with-timestamp';

@Component({
  selector: 'app-task-comments-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-comments-modal.component.html',
  styleUrl: './task-comments-modal.component.css',
})
export class TaskCommentsModalComponent {
  @ViewChild('commentInput') commentInputRef!: ElementRef<HTMLInputElement>;

  readonly _task: ITask = inject(DIALOG_DATA);
  readonly _dialogRef: DialogRef<boolean> = inject(DialogRef);

  taskCommentsChanged = false;

  commentControl = new FormControl('', [Validators.required]);

  onAddComment() {
    const newComment: IComment = {
      id: generateUniqueIdWithTimestamp(),
      description: this.commentControl.value as string,
    };
    this._task.comments.unshift(newComment);
    this.commentControl.reset();
    this.taskCommentsChanged = true;
    this.commentInputRef.nativeElement.focus();
  }

  onCloseModal() {
    this._dialogRef.close(this.taskCommentsChanged);
  }
}
