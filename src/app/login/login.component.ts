import { User } from './../@shared/service/user.model';
import { AuthService } from './../@shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;

  constructor(public service: AuthService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._createloginForm()

    // this.service.getItemsList().subscribe((data:Item[]) => {
    //   console.log(data)
    //     }
    // );
  }
  onSubmit() {
      this.service.getUser(this.username.value,this.password.value)
    }

    get username() {
      return this.loginForm.controls.username;
    }
    get password() {
      return this.loginForm.controls.password;
    }
    private _createloginForm() {
      this.loginForm = this.formBuilder.group(
        {
          username:['', Validators.required],
          password:['', Validators.required],
        },
      );
    }

}
