import {TodoService} from "../../../core/services/todo.service";
import {AlertService} from "../../../core/services/alert.service";
import {AuthService} from "../../../core/services/auth.service";
import {ActivatedRoute, Router} from '@angular/router';
import {TodoList} from 'src/app/core/models/todo';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoListTitle: string = "";
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
  }

  createTodolist() {
    this.todoService.createTodoList({title: this.todoListTitle})
      .subscribe(
        (response) => {
          this.alertService.success(
            `Todo ${response.title} list created`,
            {keepAfterRouteChange: true, autoClose: true});
          this.todoLists.push(response);
        },
        (error) => {
          this.alertService.error(error);
        });
  }

  removeTodoList(todoListId: string) {
    this.todoService.removeTodoList(todoListId)
      .subscribe(
        (response) => {
          this.todoLists = this.todoLists.filter(todoList =>
            todoList.id !== todoListId);
          this.alertService.success(response.message);
        },
        (error) => {
            this.alertService.error(error,
                {keepAfterRouteChange: true, autoClose: true});
        }
    )
  }

  logOut() {
    this.authService.logout()
      .subscribe((data) => {
        this.alertService.success("Log out successful",
          {keepAfterRouteChange: true, autoClose: true});
        this.router.navigate(['/account/login'], {relativeTo: this.route});
      }, (error) => {
        this.alertService.error("Log out failed",
          {keepAfterRouteChange: true, autoClose: true});
        this.router.navigate(['/account/login'], {relativeTo: this.route});
      });
  }

  private loadTodoLists() {
    this.todoService.getTodoLists().subscribe(
      (response: TodoList[]) => {
        this.todoLists = response;
        this.loading = false;
      },
      (error) => {
        this.alertService.error(error,
          {keepAfterRouteChange: true, autoClose: true});
        this.loading = false;
      })
  }
}
