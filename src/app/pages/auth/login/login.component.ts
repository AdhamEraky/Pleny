import { NotificationService } from './../../../shared/services/notification.service';
import { AuthService } from './../../../core/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  submitLoading!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', Validators.required),
    });
  }

  submit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.submitLoading = true;
      const { username, password } = this.loginForm.value;

      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.authService.setLoginStatus(true);
          localStorage.setItem('token', res?.token);
          this.router.navigate(['/products']);
          this.notify.success('Welcome, You are logged in successfully');
        },
        error: (err) => {
          this.notify.error(err);
          this.submitLoading = false;
        },
      });
    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}
