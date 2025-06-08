import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { WalletsDisplayComponent } from './components/wallet/wallets-display/wallets-display.component';
import { LoginComponent } from './components/login/login.component';
import { TransactionsComponent } from './components/wallet/transactions/transactions.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { RegisterComponent } from './components/register/register.component';
import { roleGuard } from './guards/role.guard';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'confirm-account', component: ConfirmAccountComponent},
    {path: 'home', component:LandingPageComponent},
    {path: 'wallets', component:WalletsDisplayComponent, canActivate: [ roleGuard], data: { roles: [0, 1] }},
    {path: 'transactions', component: TransactionsComponent, canActivate: [authGuard, roleGuard], data: { roles: [0, 1] }},

    {path: 'admin',component: AdminPanelComponent,canActivate: [authGuard, roleGuard], data: { roles: [0] }}, 

    { path: '**', redirectTo: 'home' }
];
