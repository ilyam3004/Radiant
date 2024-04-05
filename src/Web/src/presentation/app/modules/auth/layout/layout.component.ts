import {Component} from '@angular/core';
import {Router} from '@angular/router'
import {UserAuthenticationUseCase} from "../../../../../domain/usecases/user/user-authentication.usecase";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  constructor(
    private router: Router,
    private userAuthenticationUseCase: UserAuthenticationUseCase,
  ) {
    if (this.userAuthenticationUseCase.execute()) {
      this.router.navigate(['/todo'])
    }
  }
}
