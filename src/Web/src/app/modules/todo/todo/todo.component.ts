import {CreateTodoItemRequest, GetTodoListsResponse, TodoItem, TodoList} from 'src/app/core/models/todo';
import {TodoService} from "../../../core/services/todo.service";
import {AlertService} from "../../../core/services/alert.service";
import {AuthService} from "../../../core/services/auth.service";
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {first} from "rxjs";

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoListTitle: string = "";
  todayTodoList: TodoList = {} as TodoList;
  todoLists: TodoList[] = [];

  fetchTodoListsLoading: boolean = false;
  fetchTodayTodoListLoading: boolean = false;
  newTodoLoading: boolean = false;

  todoListsNotFound: boolean = false;

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private todoService: TodoService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchTodayTodoListLoading = true;
    this.loadTodayTodoList();

    this.fetchTodoListsLoading = true;
    this.loadTodoLists();
  }

  private loadTodoLists() {
    this.todoService.getTodoLists()
      .pipe(first())
      .subscribe((response: GetTodoListsResponse) => {
          this.fetchTodoListsLoading = false;
          this.todoLists = response.todoLists;
          this.todoListsNotFound = this.todoLists.length === 0;
        },
        (error) => {
          this.fetchTodoListsLoading = false;
          this.alertService.error(error,
            {keepAfterRouteChange: true, autoClose: true});
        });
  }

  private loadTodayTodoList() {
    this.todoService.getTodayTodoList()
      .pipe(first())
      .subscribe((response: TodoList) => {
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
    this.todoService.createTodoList({title: this.todoListTitle})
      .subscribe({
        next: (todoList: TodoList) => {
          this.alertService.success(
            `Todo ${todoList.title} list created`,
            {keepAfterRouteChange: true, autoClose: true});
          this.todoLists.push(todoList);
          this.newTodoLoading = false;
          this.todoListsNotFound = false;
          this.todoListTitle = "";
        },
        error: error => {
          this.alertService.error(error);
          this.newTodoLoading = false;
        }
      });
  }

  removeTodoList(todoListId: string) {
    this.todoService.removeTodoList(todoListId)
      .subscribe({
        next: (response) => {
          this.todoLists = this.todoLists.filter(todoList =>
            todoList.id !== todoListId);
          this.alertService.success(response.message);
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

  addTodoItem(params: [CreateTodoItemRequest, TodoList, boolean]) {
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

  removeTodoItem(params: [TodoItem, TodoList, boolean]) {
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

  toggleTodoItem(params: [TodoItem, boolean]) {
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
    this.authService.logout()
      .subscribe({
        next: (data) => {
          this.alertService.success("Log out successful",
            {keepAfterRouteChange: true, autoClose: true});
          this.router.navigate(['/account/login'], {relativeTo: this.route});
        },
        error: (error) => {
          this.alertService.error("Log out failed",
            {keepAfterRouteChange: true, autoClose: true});
          this.router.navigate(['/account/login'], {relativeTo: this.route});
        }
      });
  }

  private updateTodoList(updatedTodoList: TodoList) {
    const index = this.todoLists.findIndex((item) =>
      item.id === updatedTodoList.id);

    if (index !== -1) {
      this.todoLists[index] = updatedTodoList;
    }
  }

  private updateTodoItem(updatedTodoItem: TodoItem) {
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

  private updateTodayTodoListItem(updatedTodoItem: TodoItem) {
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
