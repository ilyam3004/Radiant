import { CreateTodoItemRequest, Priority, TodoItem, TodoList } from "../../../core/models/todo";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from "../../../core/services/todo.service";
import { AlertService } from "../../../core/services/alert.service";
import { DatePipe } from "@angular/common";
import {ConfirmationDialogService} from "../../../core/services/confirmation-dialog.service";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todoList!: TodoList;
  @Output() removeTodoListEvent = new EventEmitter<string>();
  @Output() addTodoItemEvent = new EventEmitter<[CreateTodoItemRequest, TodoList, boolean]>();
  @Output() removeTodoItemEvent = new EventEmitter<[TodoItem, TodoList, boolean]>();
  @Output() toggleTodoItemEvent = new EventEmitter<[TodoItem, boolean]>();

  priorities: string[] = ["🟢", "🟡", "🔴"];
  newTodoItemLoading: boolean = false;
  selectedPriority: Priority | null = null;
  deadline: string | null = null;
  note: string = "";

  constructor(private todoService: TodoService,
    private alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService,
    private datePipe: DatePipe) {
  }

  openRemoveConfirmationDialog(): void {
    this.confirmationDialogService.confirm("Remove todolist",
      `Are you sure you want to remove todolist: ${this.todoList.title}?`,
      "Remove", "Cancel")
      .then((confirmed) => {
        if (confirmed) {
          this.removeTodoListEvent.emit(this.todoList.id);
        }
      })
      .catch(() => { });
  }

  addTodoItem() {
    if (this.selectedPriority === null) {
      this.alertService.error("Please select a priority");
      return;
    }
    if (!this.note) {
      this.alertService.error("Please enter a note");
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
          this.addTodoItemEvent.emit([createRequest, todoList, this.todoList.isTodayTodoList]);
          this.newTodoItemLoading = false;
          this.resetInputFields();
        },
        error: (error) => {
          this.newTodoItemLoading = false;
          this.alertService.error(error,
            { keepAfterRouteChange: true, autoClose: true });
        }
      });
  }

  toggleTodoItem(itemId: string) {
    this.changeTodoItemLoadingState(itemId, true);
    this.todoService.toggleTodoItem(itemId)
      .subscribe({
        next: (todoItem: TodoItem) => {
          this.changeTodoItemLoadingState(itemId, false);
          this.toggleTodoItemEvent.emit([todoItem, this.todoList.isTodayTodoList]);
        },
        error: (error) => {
          this.changeTodoItemLoadingState(itemId, false);
          this.alertService.error(error,
            { keepAfterRouteChange: true, autoClose: true });
        }
      });
  }

  removeTodoItem(todoItem: TodoItem) {
    this.changeTodoItemLoadingState(todoItem.id, true);
    this.todoService.removeTodoItem(todoItem.id)
      .subscribe({
        next: (todoList: TodoList) => {
          this.removeTodoItemEvent.emit([todoItem, todoList, this.todoList.isTodayTodoList]);
        },
        error: (error) => {
          this.changeTodoItemLoadingState(todoItem.id, false);
          this.alertService.error(error,
            { keepAfterRouteChange: true, autoClose: true });
        }
      });
  }

  handlePriorityChange(priority: Priority): void {
    this.selectedPriority = priority;
  }

  handleDateTimeChange(dateTime: string | null): void {
    this.deadline = dateTime;
  }

  getCompletedClass(done: boolean): string {
    return done ? "completed" : "";
  }

  getTaskColorClass(todoItem: TodoItem): string {
    if (todoItem.done) {
      return "table-success";
    } else {
      if (todoItem.deadline !== null) {
        if (!todoItem.done && this.isDeadLineExpired(new Date(todoItem.deadline))) {
          return "table-danger";
        }
      }
    }

    return "";
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
      return 'Today at ' + this.datePipe.transform(isoDate, 'HH:mm') ?? '-';
    }

    if (this.isYearsEqual(date)) {
      const dateWithOutYear = this.datePipe.transform(isoDate, 'MMM d, HH:mm');
      return dateWithOutYear == null ? '-' : dateWithOutYear;
    }

    const readableDate = this.datePipe.transform(isoDate, 'MMM d, y, HH:mm');
    return readableDate == null ? '-' : readableDate;
  }

  updateTodoItem(updatedTodoItem: TodoItem) {
    const index = this.todoList.todoItems
      .findIndex((item) =>
        item.id === updatedTodoItem.id);

    if (index != -1) {
      this.todoList.todoItems[index] = updatedTodoItem;
    }
  }

  private isDeadLineTomorrow(date: Date): boolean {
    const currentDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);

    return date.getDate() === tomorrowDate.getDate()
      && date.getMonth() === tomorrowDate.getMonth()
      && date.getFullYear() === tomorrowDate.getFullYear();
  }

  private isDeadLineToday(date: Date): boolean {
    const currentDate = new Date();

    return date.getDate() === currentDate.getDate()
      && date.getMonth() === currentDate.getMonth()
      && date.getFullYear() === currentDate.getFullYear();
  }

  private isDeadLineExpired(date: Date): boolean {
    const currentDate = new Date();
    return date < currentDate;
  }

  private isYearsEqual(date: Date): boolean {
    const currentDate = new Date();
    return date.getFullYear() == currentDate.getFullYear();
  }

  private changeTodoItemLoadingState(itemId: string, state: boolean) {
    this.todoList.todoItems
      .find((item) => item.id === itemId)!.loading = state;
  }

  private resetInputFields() {
    this.note = "";
  }
}
