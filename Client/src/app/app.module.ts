import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './my-component/login-page/login-page.component';
import { HomePageComponent } from './my-component/home-page/home-page.component';
import { RegisterPageComponent } from './my-component/register-page/register-page.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { UserprofilePageComponent } from './my-component/userprofile-page/userprofile-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    RegisterPageComponent,
    UserprofilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
