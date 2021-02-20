import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashComponent } from './components/dash/dash.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { DetailsComponent } from './components/details/details.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashComponent },
  { path: 'add', component: AddClientComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AddClientComponent, canActivate: [AuthGuard] },
  { path: 'client/:id', component: DetailsComponent },
  { path: 'auth/register', component: AuthComponent },
  { path: 'auth/login', component: AuthComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingRoutingModule {}
