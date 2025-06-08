import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WalletDTO } from '../../../../models/wallet-display-dto';
import { ApiService } from '../../../../services/api.service';
import { Transaction } from '../../../../models/transaction';

@Component({
  selector: 'app-transaction-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatProgressSpinnerModule
  ],
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss']
})
export class TransactionDialogComponent implements OnInit {
  transactionForm: FormGroup;
  wallet: WalletDTO;
  transactionType: 'deposit' | 'withdrawal';
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { wallet: WalletDTO, transactionType: 'deposit' | 'withdrawal' },
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.wallet = data.wallet;
    this.transactionType = data.transactionType;

    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const amount = this.transactionForm.value.amount;
    const request: Transaction = {
      walletId: this.wallet.id,
      amount: amount,
      transactionType: this.transactionType.toUpperCase() as 'DEPOSIT' | 'WITHDRAWAL' 
    };
console.log('Transaction request:', request);
    this.apiService.request('addTransaction', 'post', request, undefined, { withCredentials: true })
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error?.message || `Failed to ${this.transactionType} funds.`;
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response) => {
        if (response) {
          console.log(`${this.transactionType} successful:`, response);
          this.dialogRef.close(true);
        }
      });
  }
}