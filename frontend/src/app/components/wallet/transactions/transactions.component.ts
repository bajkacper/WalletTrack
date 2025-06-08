import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Transaction } from '../../../models/transaction'; 
import { ApiService } from '../../../services/api.service'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    CurrencyPipe,
    NgClass, 
    MatProgressSpinnerModule 
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit { 
  displayedColumns: string[] = ['transactionDate', 'amount', 'transactionType'];
  transactions: Transaction[] = [];
  isLoadingTransactions: boolean = false;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchUserTransactions();
  }

  fetchUserTransactions(): void {
    this.isLoadingTransactions = true;
    this.errorMessage = null;

    this.apiService.request<Transaction[]>('myTransactions', 'GET', undefined, undefined, { withCredentials: true })
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to load transactions. Please try again.';
          return of([]);
        }),
        finalize(() => {
          this.isLoadingTransactions = false;
        })
      )
      .subscribe(data => {
        this.transactions = data;
      });
  }
}