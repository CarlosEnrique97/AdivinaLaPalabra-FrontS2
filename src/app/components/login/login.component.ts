import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  userForm: FormGroup = this.formBuilder.group({
    username:[null,[Validators.required]],
    password:[null,[Validators.required]]
  });

  formValue:any;

  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY0dGMVptRnVaRzl6IiwiaWF0IjoxNjgzMjgwNTk2LCJleHAiOjE3NzMyODA1OTZ9.j4zZFf1aC63GxV4QUizbZWQQbLh8Ve0gc1CA7Bse7K0";

  constructor(private authservice: AuthService, private formBuilder: FormBuilder){}


  login(){

    const username = this.userForm.value.username
    let bytesusername= new TextEncoder().encode(username)
    let usernameEncrypt = btoa(String.fromCharCode(...new Uint8Array(bytesusername)));
    
    const password = this.userForm.value.password
    let bytespassword= new TextEncoder().encode(password)
    let passwordEncrypt = btoa(String.fromCharCode(...new Uint8Array(bytespassword)));

    this.authservice.mostrar();
  }

}
