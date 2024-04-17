import {TodolistCreateUseCase} from "../../../../../domain/usecases/todolist/todolist-create.usecase";
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {TodoListModel} from "../../../../../domain/models/todolist.model";
import {TodolistRemoveUseCase} from "src/domain/usecases/todolist/todolist-remove.usecase";
import {TodoSuccessMessages} from "../../../../../domain/messages/success";
import {CreateTodoItemRequest, TodoItemModel} from "../../../../../domain/models/todoitem.model";
import {TodolistGetAllUseCase} from "../../../../../domain/usecases/todolist/todolist-get-all.usecase";
import {TodolistTodayUseCase} from "../../../../../domain/usecases/todolist/todolist-today.usecase";
import {AlertService} from "../../../../../domain/services/alert.service";
import {UserLogoutUseCase} from "../../../../../domain/usecases/user/user-logout.usecase";

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoListTitle: string = "";
  todayTodoList: TodoListModel = {} as TodoListModel;
  todoLists: TodoListModel[] = [];

  fetchTodoListsLoading: boolean = false;
  fetchTodayTodoListLoading: boolean = false;
  newTodoLoading: boolean = false;

  todoListsNotFound: boolean = false;

  constructor(private todolistCreateUseCase: TodolistCreateUseCase,
              private todolistRemoveUseCase: TodolistRemoveUseCase,
              private todolistGetAllUseCase: TodolistGetAllUseCase,
              private todolistTodayUseCase: TodolistTodayUseCase,
              private userLogOutUseCase: UserLogoutUseCase,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchTodayTodoListLoading = true;
    this.loadTodayTodoList();

    this.fetchTodoListsLoading = true;
    this.loadTodoLists();
  }

  private loadTodoLists() {
    this.todolistGetAllUseCase.execute()
      .subscribe((response: TodoListModel[]) => {
          this.fetchTodoListsLoading = false;
          this.todoLists = response;
          this.todoListsNotFound = this.todoLists.length === 0;
        },
        (error) => {
          this.fetchTodoListsLoading = false;
          this.alertService.error(error,
            {keepAfterRouteChange: true, autoClose: true});
        });
  }

  private loadTodayTodoList() {
    this.todolistTodayUseCase.execute()
      .subscribe((response: TodoListModel) => {
          this.todayTodoList = response;
          this.fetchTodayTodoListLoading = false;
        },
        (error) => {
          this.alertService.error(error,
            {keepAfterRouteChange: true, autoClose: true});
          this.fetchTodayTodoListLoading = false;
        });
  }

  createTodolist() {
    this.newTodoLoading = true;
    this.todolistCreateUseCase.execute({title: this.todoListTitle})
      .subscribe({
        next: (todoList: TodoListModel) => {
          this.alertService.success(
            TodoSuccessMessages.CREATED_SUCCESSFULLY(todoList.title),
            {keepAfterRouteChange: true, autoClose: true});
          this.todoLists.push(todoList);
          this.newTodoLoading = false;
          this.todoListsNotFound = false;
          this.todoListTitle = "";
        },
        error: error => {
          console.log(error)
          this.alertService.error(error.error.detail);
          this.newTodoLoading = false;
        }
      });
  }

  removeTodoList(todoListId: string) {
    this.todolistRemoveUseCase.execute(todoListId)
      .subscribe({
        next: () => {
          this.todoLists = this.todoLists.filter(todoList =>
            todoList.id !== todoListId);
          this.alertService.success(TodoSuccessMessages.REMOVED_SUCCESSFULLY);
          this.setNotFoundIfEmpty();
        },
        error: (error) => {
          this.alertService.error(error,
            {keepAfterRouteChange: true, autoClose: true});
        }
      });
  }

  private setNotFoundIfEmpty() {
    return this.todoListsNotFound = this.todoLists.length === 0;
  }

  addTodoItem(params: [CreateTodoItemRequest, TodoListModel, boolean]) {
    const createRequest = params[0];
    const todoList = params[1];
    const isTodayTodoList = params[2];

    if (isTodayTodoList) {
      this.todayTodoList = todoList;
    } else {
      this.updateTodoList(todoList);
      this.reloadTodayTodoListIfDeadlineToday(createRequest.deadline);
    }
  }

  removeTodoItem(params: [TodoItemModel, TodoListModel, boolean]) {
    const todoItem = params[0];
    const todoList = params[1];
    const isTodayTodoList = params[2];

    if (isTodayTodoList) {
      this.todayTodoList = todoList;
    } else {
      this.updateTodoList(todoList);
      this.reloadTodayTodoListIfDeadlineToday(todoItem.deadline);
    }
  }

  toggleTodoItem(params: [TodoItemModel, boolean]) {
    const todoItem = params[0];
    const isTodayTodoList = params[1];

    if (isTodayTodoList) {
      this.updateTodayTodoListItem(todoItem)
    } else {
      this.updateTodoItem(todoItem);
      this.reloadTodayTodoListIfDeadlineToday(todoItem.deadline);
    }
  }

  logOut() {
    this.userLogOutUseCase.execute()
      .subscribe({
        next: () => {
          this.alertService.success("Log out successful",
            {keepAfterRouteChange: true, autoClose: true});
          this.router.navigate(['/account/login'], {relativeTo: this.route});
        },
        error: () => {
          this.alertService.error("Log out failed",
            {keepAfterRouteChange: true, autoClose: true});
          this.router.navigate(['/account/login'], {relativeTo: this.route});
        }
      });
  }

  private updateTodoList(updatedTodoList: TodoListModel) {
    const index = this.todoLists.findIndex((item) =>
      item.id === updatedTodoList.id);

    if (index !== -1) {
      this.todoLists[index] = updatedTodoList;
    }
  }

  private updateTodoItem(updatedTodoItem: TodoItemModel) {
    const todoList = this.todoLists.find(
      (item) => item.id === updatedTodoItem.todoListId);

    if (todoList) {
      const index = todoList.todoItems.findIndex(
        (item) => item.id === updatedTodoItem.id);

      if (index !== -1) {
        todoList.todoItems[index] = updatedTodoItem;
      }
    }
  }

  private updateTodayTodoListItem(updatedTodoItem: TodoItemModel) {
    const index = this.todayTodoList.todoItems.findIndex(
      (item) => item.id === updatedTodoItem.id);

    if (index !== -1) {
      this.todayTodoList.todoItems[index] = updatedTodoItem;
    }
  }

  private reloadTodayTodoListIfDeadlineToday(deadline: string | null) {
    if (deadline) {
      if (this.isDeadLineToday(new Date(deadline))) {
        this.loadTodayTodoList();
      }
    }
  }

  private isDeadLineToday(date: Date): boolean {
    const currentDate = new Date();

    return date.getDate() === currentDate.getDate()
      && date.getMonth() === currentDate.getMonth()
      && date.getFullYear() === currentDate.getFullYear();
  }
}
