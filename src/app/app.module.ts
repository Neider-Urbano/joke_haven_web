import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { JokesComponent } from './pages/jokes/jokes.component';
import { NavbarUserLoginComponent } from './components/navbar-user-login/navbar-user-login.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    JokesComponent,
    NavbarUserLoginComponent,
    AvatarComponent,
    ThemeToggleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
