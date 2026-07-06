import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-list-section',
  imports: [TaskCardComponent],
  templateUrl: './task-list-section.component.html',
  styleUrl: './task-list-section.component.css',
})
export class TaskListSectionComponent implements OnInit {
  private readonly _taskService = inject(TaskService);

  ngOnInit(): void {
    this._taskService.todoTasks.subscribe((tasks) => {
      console.log('TODO Tasks:', tasks);
    });
  }
}
