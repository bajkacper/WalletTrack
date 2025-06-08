import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm?:FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    private apiService: ApiService, 
    private router: Router 
  ) { }

   ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(12)]],
        confirm_password: ['', Validators.required], 
      },
      { validators: this.checkPassword }
    );
  }

  checkPassword(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm_password = group.get('confirm_password')?.value;

    return password === confirm_password ? null : { notSame: true };
  }

  register(){
    if (!this.registrationForm?.valid) return;

  const { firstName, lastName, email, password } = this.registrationForm.value;
  const payload = { firstName, lastName, email, password };

    this.apiService.request('register', 'post', payload).subscribe({
       next: (result) => {
        console.log('Registration result', result);
        if (result) {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'You have registered successfully! Check your email for confirmation',
            timer: 2000,
            showConfirmButton: false 
          });
          this.router.navigate(['/']);
        }

        this.registrationForm?.reset();
      },
      error: (err) => {        
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Registration failed. Please try again later.',
          showConfirmButton: true 
        });
      }
    });
  }
   togglePassword() {
    this.showPassword = !this.showPassword; 
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
