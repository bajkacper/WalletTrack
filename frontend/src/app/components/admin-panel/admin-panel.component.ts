import { Component, OnInit } from '@angular/core'; // Import OnInit
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { UserDTO } from '../../models/user-dto'; // Ensure this path is correct
import { CommonModule } from '@angular/common'; // Needed for *ngIf if you add loading/error states
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // For loading spinner
import { catchError, finalize } from 'rxjs/operators'; // For error handling and cleanup
import { of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit { 
  users: UserDTO[] = []; 
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'actions'];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.isLoading = true;
    this.errorMessage = null; 

    this.apiService.request<UserDTO[]>('getAllUsers', 'get', undefined, undefined, { withCredentials: true })
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Failed to load users. Please try again';
          this.users = []; 
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false; 
        })
      )
      .subscribe((data: UserDTO[]) => {
        this.users = data.map(user => ({
          ...user,
          role: this.mapRole(user.role as number) 
        }));
      });
  }

  private mapRole(roleValue: number): string {
    switch (roleValue) {
      case 0: return 'ADMIN';
      case 1: return 'USER';
      default: return 'UNKNOWN';
    }
  }

  deleteUser(user: UserDTO): void {
    if (confirm(`Are you sure you want to delete user ${user.email}?`)) {
      this.isLoading = true;
      this.errorMessage = null;
      this.apiService.request<void>('deleteUser', 'delete', undefined, user.id, { withCredentials: true })
        .pipe(
          catchError((error) => {
            this.errorMessage = 'Failed to delete user. Please try again.';
            return of(null);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(() => {
          this.getAllUsers();
        });
    }
  }
   openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px', 
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) {
        this.addUser(newUser);
      }
    });
  }

  addUser(userData: Partial<UserDTO>): void { 
    this.isLoading = true;
    this.errorMessage = null;

    const userPayload = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      role: userData.role || 1 
    };

    this.apiService.request<UserDTO>('addUsers', 'post', userPayload, undefined, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Error adding user:', error);
          this.errorMessage = error.error?.message || 'Failed to add user. Please check form data.';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((addedUser: UserDTO | null) => {
        if (addedUser) {
          console.log('User added successfully:', addedUser);
          this.getAllUsers();
        }
      });
  }
}