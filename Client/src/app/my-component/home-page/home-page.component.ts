import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private cookies: CookieService) { }

  ngOnInit(): void {
  }

  // Using Local Storage
  isLogin: boolean = JSON.parse(localStorage.getItem('isLogin'));
  name = localStorage.getItem('name');
  email = localStorage.getItem('email');

  // Using Cookies
  // isLogin: boolean = JSON.parse(this.cookies.get('isLogin'));
  // name = this.cookies.get('name');
  // email = this.cookies.get('email');

  onLogout() {
    // Using Local Storage
    localStorage.clear();
    this.isLogin = false;
    localStorage.setItem('isLogin', JSON.stringify(this.isLogin));

    // Using Cookies
    this.cookies.deleteAll()
    this.isLogin = false;
    this.cookies.set('isLogin', JSON.stringify(this.isLogin));
  }

}
