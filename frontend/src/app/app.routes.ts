import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { WalletsDisplayComponent } from './components/wallet/wallets-display/wallets-display.component';
import { LoginComponent } from './components/login/login.component';
import { AddWalletComponent } from './components/wallet/add-wallet/add-wallet.component';
import { TransactionsComponent } from './components/wallet/transactions/transactions.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {path: 'home', component:LandingPageComponent},
    {path: 'wallets', component:WalletsDisplayComponent},
    {path: 'login', component:LoginComponent},
    {path: 'add-wallet', component:AddWalletComponent},
    {path: 'transactions', component:TransactionsComponent},
    {path: 'profile', component:ProfileSettingsComponent},
    {path: 'admin', component:AdminPanelComponent},
    {path: 'register', component:RegisterComponent},
    {path: '**', component:LandingPageComponent }
];
