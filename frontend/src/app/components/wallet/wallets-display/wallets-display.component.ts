import { CommonModule, CurrencyPipe, NgClass } from '@angular/common'; // Import CurrencyPipe, NgClass
import { Component, OnInit } from '@angular/core'; // Import OnInit
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // For loading
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { TransactionDialogComponent } from './transaction-dialog/transaction-dialog.component'; // New
import { HistoryDialogComponent } from './history-dialog/history-dialog.component'; // New
import { AddWalletDialogComponent } from './add-wallet-dialog/add-wallet-dialog.component'; // New
import { ApiService } from '../../../services/api.service';
import { WalletDTO } from '../../../models/wallet-display-dto';

@Component({
  selector: 'app-wallets-display',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    RouterLink,
    CurrencyPipe, 
    NgClass,     
    MatProgressSpinnerModule
  ],
  templateUrl: './wallets-display.component.html',
  styleUrl: './wallets-display.component.scss'
})
export class WalletsDisplayComponent implements OnInit {
  wallets: WalletDTO[] = [];
  isLoadingWallets: boolean = false;
  walletsErrorMessage: string | null = null;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchWallets();
  }

  fetchWallets(): void {
    this.isLoadingWallets = true;
    this.walletsErrorMessage = null;
    this.apiService.request<WalletDTO[]>('myWallets', 'GET', undefined, undefined, { withCredentials: true })
      .pipe(
        catchError((error) => {
          this.walletsErrorMessage = 'Failed to load wallets. Please try again.';
          return of([]);
        }),
        finalize(() => {
          this.isLoadingWallets = false;
        })
      )
      .subscribe((data: WalletDTO[]) => {
        this.wallets = data;
      });
  }

  onWalletAction(action: string, wallet: WalletDTO): void {
    switch (action) {
      case 'deposit':
      case 'withdrawal':
        this.openTransactionDialog(action, wallet);
        break;
      case 'history':
        this.openHistoryDialog(wallet);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  openTransactionDialog(type: 'deposit' | 'withdrawal', wallet: WalletDTO): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      data: { wallet: wallet, transactionType: type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchWallets();
      }
    });
  }

  openHistoryDialog(wallet: WalletDTO): void {
    this.dialog.open(HistoryDialogComponent, {
      width: '600px',
      data: { wallet: wallet }
    });
  }

  openAddWalletDialog(): void {
    const dialogRef = this.dialog.open(AddWalletDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(newWalletData => {
      if (newWalletData) {
        this.addWallet(newWalletData);
      }
    });
  }

  addWallet(walletData: { name: string, currencyId: number, initialBalance: number }): void {
    const walletDTO: Partial<WalletDTO> = {
      name: walletData.name,
      
      currencyId: walletData.currencyId ,
      balance: walletData.initialBalance
    };

    this.apiService.request<WalletDTO>('addWallet', 'post', walletDTO, undefined, { withCredentials: true })
      .pipe(
        catchError((error) => {
          alert('Failed to add wallet: ' + (error.error?.message || 'Server error.'));
          return of(null);
        }),
        finalize(() => { })
      )
      .subscribe((addedWallet) => {
        if (addedWallet) {
          this.fetchWallets();
        }
      });
  }
}