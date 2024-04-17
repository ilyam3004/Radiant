import {TodoItemCreateUseCase} from "../../../../../domain/usecases/todoitem/todoitem-create.usecase";
import {TodoItemToggleUseCase} from "../../../../../domain/usecases/todoitem/todoitem-toggle.usecase";
import {TodoItemRemoveUseCase} from "../../../../../domain/usecases/todoitem/todoitem-remove.usecase";
import {ConfirmationDialogService} from "../../../../../domain/services/confirmation-dialog.service";
import {CreateTodoItemRequest, TodoItemModel} from "../../../../../domain/models/todoitem.model";
import {AlertService} from "../../../../../domain/services/alert.service";
import {TodoListModel} from "../../../../../domain/models/todolist.model";
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Priority} from "../../../../../domain/enums/priority";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todoList!: TodoListModel;
  @Output() removeTodoListEvent = new EventEmitter<string>();
  @Output() addTodoItemEvent = new EventEmitter<[CreateTodoItemRequest, TodoListModel, boolean]>();
  @Output() removeTodoItemEvent = new EventEmitter<[TodoItemModel, TodoListModel, boolean]>();
  @Output() toggleTodoItemEvent = new EventEmitter<[TodoItemModel, boolean]>();

  newTodoItemLoading: boolean = false;
  selectedPriority: Priority | null = null;
  deadline: string | null = null;
  note: string = "";

  constructor(private confirmationDialogService: ConfirmationDialogService,
              private todoItemCreateUseCase: TodoItemCreateUseCase,
              private todoItemToggleUseCase: TodoItemToggleUseCase,
              private todoItemRemoveUseCase: TodoItemRemoveUseCase,
              private alertService: AlertService,
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
      .catch(() => {
      });
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
    this.todoItemCreateUseCase.execute(createRequest)
      .subscribe({
        next: (todoList: TodoListModel) => {
          this.addTodoItemEvent.emit([createRequest, todoList, this.todoList.isTodayTodoList]);
          this.newTodoItemLoading = false;
          this.resetInputFields();
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
    this.todoItemToggleUseCase.execute(itemId)
      .subscribe({
        next: (todoItem: TodoItemModel) => {
          this.changeTodoItemLoadingState(itemId, false);
          this.toggleTodoItemEvent.emit([todoItem, this.todoList.isTodayTodoList]);
        },
        error: (error) => {
          this.changeTodoItemLoadingState(itemId, false);
          this.alertService.error(error,
            {keepAfterRouteChange: true, autoClose: true});
        }
      });
  }

  removeTodoItem(todoItem: TodoItemModel) {
    this.changeTodoItemLoadingState(todoItem.id, true);
    this.todoItemRemoveUseCase.execute(todoItem.id)
      .subscribe({
        next: (todoList: TodoListModel) => {
          this.removeTodoItemEvent.emit([todoItem, todoList, this.todoList.isTodayTodoList]);
        },
        error: (error) => {
          this.changeTodoItemLoadingState(todoItem.id, false);
          this.alertService.error(error,
            {keepAfterRouteChange: true, autoClose: true});
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

  getTaskColorClass(todoItem: TodoItemModel): string {
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

  getDeadlineClass(todoItem: TodoItemModel): string {
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

  updateTodoItem(updatedTodoItem: TodoItemModel) {
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

  protected getPriorityStyleClass(priority: number): string {
    if (priority === Priority.Low) {
      return "low-priority-circle";
    } else if (priority === Priority.Medium) {
      return "middle-priority-circle";
    } else {
      return "high-priority-circle";
    }
  }
}
