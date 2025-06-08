import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-confirm-account',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './confirm-account.component.html',
  styleUrl: './confirm-account.component.scss'
})
export class ConfirmAccountComponent implements OnInit {
  message: string = 'Trwa potwierdzanie konta...';
  error: boolean = false;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.http.get('http://localhost:8080/api/auth/confirm?token=' + token, { responseType: 'text' })
        .subscribe({
          next: (res) => {
            this.message = res || 'Konto zostało potwierdzone!';
            this.error = false;
            this.loading = false;
            setTimeout(() => this.router.navigate(['/login']), 3000);
          },
          error: () => {
            this.message = 'Nie udało się potwierdzić konta. Link może być nieprawidłowy lub wygasł.';
            this.error = true;
            this.loading = false;
          }
        });
    } else {
      this.message = 'Brak tokenu aktywacyjnego w linku.';
      this.error = true;
      this.loading = false;
    }
  }
}
