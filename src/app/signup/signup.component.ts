import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmation: new FormControl(''),
  });

  errors: string[] = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService
      .signUp(
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.confirmation
      )
      .subscribe({
        next: (data) => {
          if (data !== null) {
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          if (!!error?.error?.errors && error?.error?.errors.length !== 0) {
            this.errors = [];
            error.error.errors.forEach((element: any) => {
              this.errors.push(element.description);
            });
          }
        },
      });
  }
}
