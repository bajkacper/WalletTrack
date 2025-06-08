import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common'; // Import DatePipe
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Transaction } from '../../../../models/transaction';
import { WalletDTO } from '../../../../models/wallet-display-dto';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-history-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTableModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
    DatePipe // Add DatePipe
  ],
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss']
})
export class HistoryDialogComponent implements OnInit {
  wallet: WalletDTO;
  transactions: Transaction[] = [];
  displayedColumns: string[] = ['type', 'amount', 'date'];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<HistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { wallet: WalletDTO },
    private apiService: ApiService
  ) {
    this.wallet = data.wallet;
  }

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.apiService.request<Transaction[]>('getWalletTransactions', 'get', undefined, this.wallet.id, { withCredentials: true })
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Failed to load transaction history';
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: Transaction[]) => {
        this.transactions = data;
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}