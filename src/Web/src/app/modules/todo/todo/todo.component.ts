import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {AlertService} from "../../../core/services/alert.service";
import {ActivatedRoute, Router} from '@angular/router';
import {TodoList} from 'src/app/core/models/todo';
import {TodoService} from "../../../core/services/todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoListTitle: string = "";
  todoLists: TodoList[] = [];

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private todoService: TodoService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadTodoLists();
  }

  private loadTodoLists() {

  }

  private createTodolist() {
    this.todoService.getTodoLists().subscribe(
      (response: TodoList[]) => {
        this.todoLists = response;
      },
      (error) => {
        this.alertService.error(error,
          {keepAfterRouteChange: true, autoClose: true});
      })
  }

  private logOut() {
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
}
