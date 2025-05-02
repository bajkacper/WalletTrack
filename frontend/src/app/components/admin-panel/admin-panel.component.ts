import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [MatTableModule, MatTabsModule, MatButtonModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  users = [
    { name: 'Marek Mostowiak', email: 'example@gmail.com', role: 'Admin' },
    { name: 'Hanka Mostowiak', email: 'example@gmail.com', role: 'User' },
    { name: 'Mirosław Miro', email: 'example@gmail.com', role: 'User' }
  ];

  editUser(user: any) {
    console.log('Edit user:', user);
  }

  deleteUser(user: any) {
    console.log('Delete user:', user);
  }
}