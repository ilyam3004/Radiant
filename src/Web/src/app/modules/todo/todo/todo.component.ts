import { TodoService } from "../../../core/services/todo.service";
import { AlertService } from "../../../core/services/alert.service";
import { AuthService } from "../../../core/services/auth.service";
import { ActivatedRoute, Router } from '@angular/router';
import {CreateTodoItemRequest, GetTodoListsResponse, TodoItem, TodoList} from 'src/app/core/models/todo';
import { Component, HostBinding, OnInit } from '@angular/core';
import { first } from "rxjs";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoListTitle: string = "";
  todayTodoList: TodoList = {} as TodoList;
  todoLists: TodoList[] = [];
  loading: boolean = false;
  todoListsNotFound: boolean = false;

  constructor(private authService: AuthService,
    private alertService: AlertService,
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadTodoLists();
    this.loadTodayTodoList();
  }

  private loadTodoLists() {
    this.todoService.getTodoLists()
      .pipe(first())
      .subscribe((response: GetTodoListsResponse) => {
          this.todoLists = response.todoLists;
          this.todoListsNotFound = this.todoLists.length === 0;
          this.loading = false;
        },
        (error) => {
          this.alertService.error(error,
            { keepAfterRouteChange: true, autoClose: true });
          this.loading = false;
        });
  }

  private loadTodayTodoList() {
    this.todoService.getTodayTodoList()
      .pipe(first())
      .subscribe((response: TodoList) => {
          this.todayTodoList = response;
        },
        (error) => {
          this.alertService.error(error,
            { keepAfterRouteChange: true, autoClose: true });
        });
  }

  createTodolist() {
    this.todoService.createTodoList({ title: this.todoListTitle })
      .subscribe({
        next: (todoList: TodoList) => {
          this.alertService.success(
            `Todo ${todoList.title} list created`,
            { keepAfterRouteChange: true, autoClose: true });
          this.todoLists.push(todoList);
          this.todoListsNotFound = false;
        },
        error: error => {
          this.alertService.error(error);
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
            { keepAfterRouteChange: true, autoClose: true });
        }
      });
  }

  private setNotFoundIfEmpty() {
    return this.todoListsNotFound = this.todoLists.length === 0;
  }

  addTodoItem(createRequest: CreateTodoItemRequest) {
    this.todoService.addTodoItem(createRequest)
      .subscribe({
      next: (todoList: TodoList) => {
        this.updateTodoList(todoList);
      },
      error: (error) => {
        this.alertService.error(error,
          { keepAfterRouteChange: true, autoClose: true });
      }
    });
  }

  removeTodoItem(todoItemId: string) {
    this.todoService.removeTodoItem(todoItemId)
      .subscribe({
        next: (todoList: TodoList) => {
          this.updateTodoList(todoList);
        },
        error: (error) => {
          this.alertService.error(error,
            { keepAfterRouteChange: true, autoClose: true });
        }
      });
  }

  toggleTodoItem(todoItemId: string) {
    this.todoService.toggleTodoItem(todoItemId)
      .subscribe({
        next: (todoItem: TodoItem) => {
          this.updateTodoItem(todoItem);
        },
        error: (error) => {
          this.alertService.error(error,
            { keepAfterRouteChange: true, autoClose: true });
        }
      });
  }

  logOut() {
    this.authService.logout()
      .subscribe({
        next: (data) => {
          this.alertService.success("Log out successful",
            { keepAfterRouteChange: true, autoClose: true });
          this.router.navigate(['/account/login'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error("Log out failed",
            { keepAfterRouteChange: true, autoClose: true });
          this.router.navigate(['/account/login'], { relativeTo: this.route });
        }
      });
  }

  updateTodoList(updatedTodoList: TodoList) {
    const index = this.todoLists.findIndex((item) => item.id === updatedTodoList.id);

    if (index !== -1) {
      this.todoLists[index] = updatedTodoList;
    }
  }

  updateTodoItem(updatedTodoItem: TodoItem) {
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
}
