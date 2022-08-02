import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './my-component/home-page/home-page.component';
import { LoginPageComponent } from './my-component/login-page/login-page.component';
import { RegisterPageComponent } from './my-component/register-page/register-page.component';
import { UserprofilePageComponent } from './my-component/userprofile-page/userprofile-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'userprofile', component: UserprofilePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
