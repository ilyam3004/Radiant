import { TodoService } from "../../../core/services/todo.service";
import { AlertService } from "../../../core/services/alert.service";
import { AuthService } from "../../../core/services/auth.service";
import { ActivatedRoute, Router } from '@angular/router';
import {GetTodoListsResponse, TodoItem, TodoList} from 'src/app/core/models/todo';
import { Component, OnInit } from '@angular/core';
import { first } from "rxjs";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoListTitle: string = "";
  todoLists: TodoList[] = [];
  fetchTodoListsLoading: boolean = false;
  newTodoLoading: boolean = false;
  todoListsNotFound: boolean = false;

  constructor(private authService: AuthService,
    private alertService: AlertService,
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchTodoListsLoading = true;
    this.loadTodoLists();
  }

  private loadTodoLists() {
    this.todoService.getTodoLists()
      .pipe(first())
      .subscribe((response: GetTodoListsResponse) => {
          this.todoLists = response.todoLists;
          this.todoListsNotFound = this.todoLists.length === 0;
          this.fetchTodoListsLoading = false;
        },
        (error) => {
          this.alertService.error(error,
            { keepAfterRouteChange: true, autoClose: true });
          this.fetchTodoListsLoading = false;
        });
  }

  createTodolist() {
    this.newTodoLoading = true;
    this.todoService.createTodoList({ title: this.todoListTitle })
      .subscribe({
        next: (todoList: TodoList) => {
          this.alertService.success(
            `Todo ${todoList.title} list created`,
            { keepAfterRouteChange: true, autoClose: true });
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
            { keepAfterRouteChange: true, autoClose: true });
        }
      });
  }

  addTodoItem(todoList: TodoList) {
    this.updateTodoList(todoList);
  }

  removeTodoItem(todoList: TodoList) {
    this.updateTodoList(todoList);
  }

  toggleTodoItem(todoItem: TodoItem) {
    this.updateTodoItem(todoItem);
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

  private updateTodoList(updatedTodoList: TodoList) {
    const index = this.todoLists.findIndex((item) => item.id === updatedTodoList.id);

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

  private setNotFoundIfEmpty() {
    this.todoListsNotFound = this.todoLists.length === 0;
  }
}
