import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

  constructor(
    private userService: UserService,
    public router: Router,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
  }

  get primEmail() {
    return this.userEmails.get('primaryEmail')
  }

  get passWd() {
    return this.userEmails.get('passWord')
  }

  title = 'email-validation-tutorial';
  userEmails = new FormGroup({

    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$")]),

    passWord: new FormControl('', [
      Validators.required,
      Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$")])
  });


  onLogin() {
    console.log(this.primEmail.value, this.passWd.value)
    this.userService.login(this.primEmail.value, this.passWd.value).subscribe({
      next: (res: any) => {
        let jsonData = res;
        let success: boolean = jsonData.success;
        let errorMessage: string | null = jsonData.errorMessage;
        let name: string | null = jsonData.name;
        let id: string | null = jsonData.id;
        let isLogin: boolean;

        if(success){ //success === true is same as success
          // user validated successfuully
          console.log("Login Successfull!");
          isLogin = true;

          localStorage.setItem('isLogin', JSON.stringify(isLogin));
          sessionStorage.setItem('isLogin', JSON.stringify(isLogin));
          this.cookies.set('isLogin',JSON.stringify(isLogin),1);

          localStorage.setItem('id', id);
          sessionStorage.setItem('id', id);
          this.cookies.set('id', id);

          
          localStorage.setItem('name', name);
          sessionStorage.setItem('name', name);
          this.cookies.set('name', name);

          localStorage.setItem('email', this.primEmail.value);
          sessionStorage.setItem('email', this.primEmail.value);
          this.cookies.set('email', this.primEmail.value);

          this.router.navigate(['/']); // navigate to home
          console.log("Login Successfull!");
        } else {
          // inavlid
          if (errorMessage != null) {
            console.log(errorMessage);
          }
          console.log("Please login again with valid account!");
          isLogin = false;
          localStorage.setItem('isLogin', JSON.stringify(isLogin));
          sessionStorage.setItem('isLogin', JSON.stringify(isLogin));
          this.cookies.set('isLogin',JSON.stringify(isLogin));
        }
        console.log(res)
      },
      error: (e) => { }

    })
  }

}
