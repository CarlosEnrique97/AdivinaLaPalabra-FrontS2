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

  constructor(private authservice: AuthService, private formBuilder: FormBuilder){}


  login(){

    const username = this.userForm.value.username
    let bytesusername= new TextEncoder().encode(username)
    let usernameEncrypt = btoa(String.fromCharCode(...new Uint8Array(bytesusername)));
    
    const password = this.userForm.value.password
    let bytespassword= new TextEncoder().encode(password)
    let passwordEncrypt = btoa(String.fromCharCode(...new Uint8Array(bytespassword)));

    console.log(username)
    console.log(password)

    this.authservice.login(usernameEncrypt,passwordEncrypt).subscribe((data) => {
      console.log(data);
    });
  }

}
