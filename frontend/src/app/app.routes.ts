import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { WalletsDisplayComponent } from './components/wallets-display/wallets-display.component';

export const routes: Routes = [
    {path:'home', component:LandingPageComponent},
    {path:'wallets', component:WalletsDisplayComponent},
    {path:'**', component:LandingPageComponent }
];
