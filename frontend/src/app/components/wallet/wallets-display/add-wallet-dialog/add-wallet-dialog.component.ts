import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select'; // For currency dropdown
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../../../services/api.service';
import { Currency } from '../../../../models/currency';

@Component({
  selector: 'app-add-wallet-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-wallet-dialog.component.html',
  styleUrls: ['./add-wallet-dialog.component.scss']
})
export class AddWalletDialogComponent implements OnInit {
  addWalletForm: FormGroup;
  currencies: Currency[] = [];
  isLoadingCurrencies: boolean = false;
  currencyErrorMessage: string | null = null;
  isAddingWallet: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddWalletDialogComponent>,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.addWalletForm = this.fb.group({
      name: ['', Validators.required],
      currencyId: ['', Validators.required],
      initialBalance: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.fetchCurrencies();
  }

  fetchCurrencies(): void {
    this.isLoadingCurrencies = true;
    this.currencyErrorMessage = null;
    this.apiService.request<Currency[]>('getAllCurrencies', 'get',undefined, undefined, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Error fetching currencies:', error);
          this.currencyErrorMessage = 'Failed to load currencies';
          return of([]);
        }),
        finalize(() => {
          this.isLoadingCurrencies = false;
        })
      )
      .subscribe((data: Currency[]) => {
        this.currencies = data;
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.addWalletForm.invalid) {
      this.addWalletForm.markAllAsTouched();
      return;
    }

    this.isAddingWallet = true;
    const { name, currencyId, initialBalance } = this.addWalletForm.value;
    this.dialogRef.close({ name, currencyId, initialBalance });
  }
}