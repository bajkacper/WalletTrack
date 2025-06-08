import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoginResponse } from '../../models/login-response';
import { LoadingService } from '../../services/loading.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { LoginStatusService } from '../../services/login-status.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    public loadingService: LoadingService,
    private loginStatusService: LoginStatusService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.error = null;
    const { email, password } = this.loginForm.value;
    this.loadingService.startLoading();

    this.apiService.request<LoginResponse>('login','POST',{ email, password },undefined,{ withCredentials: true }).subscribe({
      next: (res) => {
        localStorage.setItem('role', res.userRole.toString());
        localStorage.setItem('id', res.userId.toString());
        this.loadingService.stopLoading();
        this.loginStatusService.notifyLoginStatusChange();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loadingService.stopLoading();

        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.error = 'Invalid email or password';
        } else {
          this.error = 'An unexpected error occurred';
        }
      }
    });
  }
}