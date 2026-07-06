import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
    private todoTasks$ = new BehaviorSubject<any[]>([]);
    readonly todoTasks = this.todoTasks$.asObservable();

    private doingTasks$ = new BehaviorSubject<any[]>([]);
    readonly doingTasks = this.doingTasks$.asObservable();

    private doneTasks$ = new BehaviorSubject<any[]>([]);
    readonly doneTasks = this.doneTasks$.asObservable();
}
