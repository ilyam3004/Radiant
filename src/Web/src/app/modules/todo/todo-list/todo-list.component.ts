import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CreateTodoItemRequest, Priority, TodoItem, TodoList} from "../../../core/models/todo";
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
  @Output() addTodoItemEvent = new EventEmitter<[CreateTodoItemRequest, boolean]>();
  @Output() removeTodoItemEvent = new EventEmitter<[TodoItem, boolean]>();
  @Output() toggleTodoItemEvent = new EventEmitter<[string, boolean]>();
  priorities: string[] = ["🟢", "🟡", "🔴"];

  selectedPriority: Priority | null = null;
  deadline: string | null = null;
  note: string = "";

  constructor(private alertService: AlertService,
              private datePipe: DatePipe) { }

  removeTodoList() {
    this.removeTodoListEvent.emit(this.todoList.id);
  }

  addTodoItem() {
    if (this.selectedPriority !== null) {
      this.addTodoItemEvent.emit(
        [
          {
            note: this.note,
            todoListId: this.todoList!.id,
            priority: this.selectedPriority,
            deadline: this.deadline == null ? null : new Date(this.deadline).toISOString()
          },
          this.todoList.isTodayTodoList
        ])
    } else {
      this.alertService.error("Please select a priority");
    }
  }

  toggleTodoItem(itemId: string) {
    this.toggleTodoItemEvent.emit([itemId, this.todoList.isTodayTodoList]);
  }

  removeTodoItem(todoItem: TodoItem) {
    this.removeTodoItemEvent.emit([todoItem, this.todoList.isTodayTodoList]);
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
      return 'Tomorrow';
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
}
