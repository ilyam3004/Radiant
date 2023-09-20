import {Component} from '@angular/core';
import {Router} from '@angular/router'
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // if (this.authService.isAuthenticated()) {
    //   this.router.navigate(['/todo'])
    // }
  }
}
