import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CreateTodoItemRequest, Priority, TodoItem, TodoList} from "../../../core/models/todo";
import {TodoService} from "../../../core/services/todo.service";
import {AlertService} from "../../../core/services/alert.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todoList!: TodoList;
  @Output() removeTodoListEvent = new EventEmitter<string>();
  @Output() addTodoItemEvent = new EventEmitter<TodoList>();
  @Output() removeTodoItemEvent = new EventEmitter<TodoList>();
  @Output() toggleTodoItemEvent = new EventEmitter<TodoItem>();

  priorities: string[] = ["🟢", "🟡", "🔴"];
  newTodoItemLoading: boolean = false;
  selectedPriority: Priority | null = null;
  deadline: string | null = null;
  note: string = "";

  constructor(private todoService: TodoService,
              private alertService: AlertService,
              private datePipe: DatePipe) { }

  removeTodoList() {
    this.removeTodoListEvent.emit(this.todoList.id);
  }

  addTodoItem() {
    if (this.selectedPriority === null) {
      this.alertService.error("Please select a priority");
      return;
    }
    var createRequest: CreateTodoItemRequest = {
      note: this.note,
      todoListId: this.todoList!.id,
      priority: this.selectedPriority,
      deadline: this.deadline == null ? null : new Date(this.deadline).toISOString()
    }

    this.newTodoItemLoading = true;
    this.todoService.addTodoItem(createRequest)
      .subscribe({
        next: (todoList: TodoList) => {
          this.addTodoItemEvent.emit(todoList);
          this.newTodoItemLoading = false;
        },
        error: (error) => {
          this.newTodoItemLoading = false;
          this.alertService.error(error,
            {keepAfterRouteChange: true, autoClose: true});
        }
      });
  }

  toggleTodoItem(itemId: string) {
    this.changeTodoItemLoadingState(itemId, true);
    this.todoService.toggleTodoItem(itemId)
      .subscribe({
        next: (todoItem: TodoItem) => {
          this.changeTodoItemLoadingState(itemId, false);
          this.toggleTodoItemEvent.emit(todoItem);
        },
        error: (error) => {
          this.changeTodoItemLoadingState(itemId, false);
          this.alertService.error(error,
            { keepAfterRouteChange: true, autoClose: true });
        }
      });
  }

  removeTodoItem(todoItemId: string) {
    this.changeTodoItemLoadingState(todoItemId, true);
    this.todoService.removeTodoItem(todoItemId)
      .subscribe({
        next: (todoList: TodoList) => {
          this.removeTodoItemEvent.emit(todoList);
        },
        error: (error) => {
          this.changeTodoItemLoadingState(todoItemId, false);
          this.alertService.error(error,
            { keepAfterRouteChange: true, autoClose: true });
        }
      });
  }

  handlePriorityChange(priority: Priority): void {
    this.selectedPriority = priority;
  }

  handleDateTimeChange(dateTime: string): void {
    this.deadline = dateTime;
  }

  getCompletedClass(done: boolean): string {
    return done ? "completed" : "";
  }

  getDeadlineClass(todoItem: TodoItem): string {
    if (todoItem.deadline !== null) {
      if (!todoItem.done && this.isDeadLineExpired(new Date(todoItem.deadline))) {
        return "deadline-expired";
      }
    }

    return "";
  }

  convertDateToReadableFormat(isoDate: string): string {
    const date = new Date(isoDate);

    if (this.isDeadLineExpired(date)) {
      return 'Expired';
    }

    if (this.isDeadLineTomorrow(date)) {
      return 'Tomorrow at ' + this.datePipe.transform(isoDate, 'HH:mm') ?? '-';
    }

    if (this.isDeadLineToday(date)) {
      return 'Today';
    }

    if (this.isYearsEqual(date)) {
      const dateWithOutYear = this.datePipe.transform(isoDate, 'MMM d, HH:mm');
      return dateWithOutYear == null ? '-' : dateWithOutYear;
    }

    const readableDate = this.datePipe.transform(isoDate, 'MMM d, y, HH:mm');
    return readableDate == null ? '-' : readableDate;
  }

  isDeadLineTomorrow(date: Date): boolean {
    const currentDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);

    return date.getDate() === tomorrowDate.getDate()
      && date.getMonth() === tomorrowDate.getMonth()
      && date.getFullYear() === tomorrowDate.getFullYear();
  }

  isDeadLineToday(date: Date): boolean {
    const currentDate = new Date();

    return date.getDate() === currentDate.getDate()
      && date.getMonth() === currentDate.getMonth()
      && date.getFullYear() === currentDate.getFullYear();
  }

  isDeadLineExpired(date: Date): boolean {
    const currentDate = new Date();
    return date < currentDate;
  }

  isYearsEqual(date: Date): boolean {
    const currentDate = new Date();
    return date.getFullYear() == currentDate.getFullYear();
  }

  private changeTodoItemLoadingState(itemId: string, state: boolean) {
    this.todoList.todoItems
      .find((item) => item.id === itemId)!.loading = state;
  }
}
