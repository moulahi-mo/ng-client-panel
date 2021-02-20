import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { RoutingRoutingModule } from './routing.module';
import { AppComponent } from './app.component';

import { AuthClientsService } from './services/auth-clients.service';
import { DbClientsService } from './services/db-clients.service';

import { NavbarComponent } from './/components/navbar/navbar.component';
import { DashComponent } from './components/dash/dash.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { DetailsComponent } from './components/details/details.component';
import { DbUsersService } from './services/db-users.service';
import { SettingsService } from './services/settings.service';
import { ProfileService } from './services/profile.service';
import { TokenInterceptor } from './services/token.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashComponent,
    AuthComponent,
    ProfileComponent,
    SettingsComponent,
    HomeComponent,
    NotFoundComponent,
    AddClientComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    RoutingRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    DbClientsService,
    AuthClientsService,
    DbUsersService,
    SettingsService,
    ProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
