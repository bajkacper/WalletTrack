import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-wallets-display',
  standalone: true,
  imports: [ 
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './wallets-display.component.html',
  styleUrl: './wallets-display.component.scss'
})
export class WalletsDisplayComponent {
  wallets = [
    { name: 'Main Wallet', balance: 32058.98, change: 3968.0 },
    { name: 'Savings Wallet', balance: 15000.0, change: -500.0 },
    { name: 'Travel Wallet', balance: 5000.0, change: 200.0 },
    { name: 'Main Wallet', balance: 32058.98, change: 3968.0 },
    { name: 'Savings Wallet', balance: 15000.0, change: -500.0 },
    { name: 'Travel Wallet', balance: 5000.0, change: 200.0 }
  ];

  onButtonClick(action: string, wallet: any) {
    console.log(`Action: ${action}, Wallet: ${wallet.name}`);
  }

  // addWallet() {
  //   console.log('Add Wallet button clicked');
  // }
}
