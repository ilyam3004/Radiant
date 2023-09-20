import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterRequest} from "../../../core/models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {first} from "rxjs";
import {AuthService} from "../../../core/services/auth.service";
import {AlertService} from "../../../core/services/alert.service";

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      username: ['', [Validators.required]],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    let request: RegisterRequest = {
      email: this.form.value['email'],
      password: this.form.value['password'],
      username: this.form.value['username']
    }

    console.log(request);

    this.loading = true;
    this.accountService.register(request)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful',
            { keepAfterRouteChange: true, autoClose: true });
          this.router.navigate(['../login'], {relativeTo: this.route});
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
