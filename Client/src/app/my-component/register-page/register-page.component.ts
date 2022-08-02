import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
  }

  get firstName() {
    return this.userEmails.get('firstLastName');
  }

  get primEmail() {
    return this.userEmails.get('primaryEmail');
  }

  get passWd() {
    return this.form.get('password');
  }

  get confirmPass() {
    return this.form.get('confirm_password');
  }

  title = 'email-validation';
  userEmails = new FormGroup({

    firstLastName: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z]+ [a-zA-Z]+")]),

    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$")]),

    // passWord: new FormControl('', [
    //   Validators.required,
    //   Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$")])
  });

  onRegister() {
    console.log(this.firstName.value, this.primEmail.value, this.passWd.value)
    this.userService.register(this.firstName.value, this.primEmail.value, this.passWd.value).subscribe({
      next: (res:any) => {
        // let jsonData = JSON.stringify(res);
        let jsonData = res;
        let success: boolean = jsonData.success;
        let errorMessage: string | null = jsonData.errorMessage;
        if (success) { //res === true is same as res
          // user validated successfuully
          console.log("Register Successfully!");
        } else {
          // inavlid
          if (errorMessage != null) {
            // user already register with this email id
            console.log(errorMessage);
            console.log("THis Email id used already! Please use another email id!");
          }
          console.log("Try Again!");
        }
        console.log(res)
      },
      error: (e) => { }

    })
  }
}
