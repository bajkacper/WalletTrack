import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-wallet',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-wallet.component.html',
  styleUrl: './add-wallet.component.scss'
})
export class AddWalletComponent {
  walletForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.walletForm = this.fb.group({
      name: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.walletForm.valid) {
      console.log('New Wallet:', this.walletForm.value);
    }
  }
}
