import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {AlertService} from "../../../core/services/alert.service";
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  constructor(private authService: AuthService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router)
  { }

  logOut() {
    this.authService.logout()
      .subscribe((data) => {
        this.alertService.success("Log out successful",
          { keepAfterRouteChange: true, autoClose: true });
        this.router.navigate(['/account/login'], {relativeTo: this.route});
      }, (error) => {
        this.alertService.error("Log out failed",
          { keepAfterRouteChange: true, autoClose: true });
        this.router.navigate(['/account/login'], {relativeTo: this.route});
      });
  }
}
