import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../../core/services/auth.service";
import {AlertService} from "../../../core/services/alert.service";
import {LoginRequest, RegisterRequest} from "../../../core/models/user";
import {first} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    let request: LoginRequest = {
      email: this.form.value['email'],
      password: this.form.value['password']
    }

    this.loading = true;
    this.authService.login(request)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Login successful',
            {keepAfterRouteChange: true, autoClose: true});
          this.loading = true;
          this.router.navigate(['/todo'], {relativeTo: this.route});
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
