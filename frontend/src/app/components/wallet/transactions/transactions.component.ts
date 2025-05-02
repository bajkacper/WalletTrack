import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  displayedColumns: string[] = ['date', 'description', 'amount', 'type'];
  transactions = [
    { date: new Date(), description: 'Groceries', amount: -50, type: 'Expense' },
    { date: new Date(), description: 'Salary', amount: 1500, type: 'Income' },
    { date: new Date(), description: 'Electricity Bill', amount: -100, type: 'Expense' },
    { date: new Date(), description: 'Freelance Work', amount: 500, type: 'Income' }
  ];
}
