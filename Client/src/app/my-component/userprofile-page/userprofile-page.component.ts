import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-userprofile-page',
  templateUrl: './userprofile-page.component.html',
  styleUrls: ['./userprofile-page.component.css']
})
export class UserprofilePageComponent implements OnInit {

  constructor(private userService: UserService,
    private cookies: CookieService,
    public router: Router) { }

  ngOnInit(): void {
  }

  get firstName() {
    return this.userEmails.get('firstLastName');
  }

  userEmails = new FormGroup({

    firstLastName: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z]+ [a-zA-Z]+")]),

  });



  // Using Local Storage
  isLogin: boolean = JSON.parse(localStorage.getItem('isLogin'));
  name = localStorage.getItem('name');
  email = localStorage.getItem('email');
  id = localStorage.getItem('id');
  newName: string;




  onLogout() {
    // Using Local Storage
    localStorage.clear();
    this.isLogin = false;
    localStorage.setItem('isLogin', JSON.stringify(this.isLogin));

    // Using Cookies
    this.cookies.deleteAll()
    this.isLogin = false;
    this.cookies.set('isLogin', JSON.stringify(this.isLogin));
    this.router.navigate(['/']); // navigate to home
  }

  editName() {
    this.newName = this.firstName.value;
    console.log("editName: ", this.newName)
    this.userService.profileUpdate(this.id, this.newName).subscribe({

      next: (res: any) => {
        let jsonData = res;
        let success: boolean = jsonData.success;
        let errorMessage: string | null = jsonData.errorMessage;
        let isDeleteAcc: boolean;

        if (success) { //success === true is same as success
          isDeleteAcc = true;
          localStorage.setItem('name', this.newName);
          console.log("Name Update Successfull!");
          window.location.reload();
        } else {
          // inavlid
          if (errorMessage != null) {
            console.log(errorMessage);
          }
          console.log("Please Try again!");

        }
        console.log(res)
      },
      error: (e) => { }
    })

  }

  deleteAccount() {
    console.log("Account Delete: ", this.id);
    this.userService.accountDelete(this.id).subscribe({

      next: (res: any) => {
        let jsonData = res;
        let success: boolean = jsonData.success;
        let errorMessage: string | null = jsonData.errorMessage;
        let isDeleteAcc: boolean;

        if (success) { //success === true is same as success
          isDeleteAcc = true;
          console.log("Account Deleted Successfull!");
          this.onLogout();
        } else {
          // inavlid
          if (errorMessage != null) {
            console.log(errorMessage);
          }
          console.log("Please Try again!");

        }
        console.log(res)
      },
      error: (e) => { }

    })

  }


}
