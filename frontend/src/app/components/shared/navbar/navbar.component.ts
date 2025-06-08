import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { LandingPageComponent } from "../../landing-page/landing-page.component";
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { catchError } from 'rxjs/operators'; 
import { LoginStatusService } from '../../../services/login-status.service';
import { StorageService } from '../../../services/storage.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,
    NgClass,
    LandingPageComponent,
    AsyncPipe,
    CommonModule
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();
  private loginStatusSubscription!: Subscription;
  admin: string | undefined| number = undefined; 

  constructor(private router: Router, private apiService: ApiService,private loginStatusService: LoginStatusService, private storage: StorageService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
     this.loginStatusSubscription = this.loginStatusService.loginStatusChanged$.subscribe(() => {
      this.checkLoginStatus(); 
    });
    this.admin = this.storage.get('role');
  }
  ngOnChanges(): void {
    this.admin = this.storage.get('role');
  }
  
  ngOnDestroy(): void {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  checkLoginStatus(): void {
    this.apiService.request<any>('checkStatus', 'GET', undefined, undefined, { withCredentials: true })
      .pipe(
        catchError((error: any) => {
          this._isLoggedIn.next(false); 
          return of(null); 
        })
      )
      .subscribe((res) => {
        if (res && res.isAuthenticated) { 
          this._isLoggedIn.next(true);
        } else {
          this._isLoggedIn.next(false);
        }
      });
    this.admin = this.storage.get('role');
  }

  logout(): void {
    this.apiService.request<any>('logout', 'POST', undefined, undefined, { withCredentials: true }).subscribe({
      next: () => {
        this._isLoggedIn.next(false);
        this.router.navigate(['/login']);
        this.loginStatusService.notifyLoginStatusChange();
      },
      error: (err) => {
        alert('Logout failed. Please try again.');
      }
    });
  }
}