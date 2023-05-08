import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userForm: FormGroup = this.formBuilder.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  formValue: any;

  constructor(
    private authservice: AuthService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {}

  login() {
    const username = this.userForm.value.username;
    let bytesusername = new TextEncoder().encode(username);
    let usernameEncrypt = btoa(
      String.fromCharCode(...new Uint8Array(bytesusername))
    );

    const password = this.userForm.value.password;
    let bytespassword = new TextEncoder().encode(password);
    let passwordEncrypt = btoa(
      String.fromCharCode(...new Uint8Array(bytespassword))
    );

    const user = { name: usernameEncrypt, password: passwordEncrypt };

    this.authservice.login(user).subscribe({
      next: (response: any) => {
        const token = response.token;
        this.router.navigateByUrl('/');
      },
    });
  }
}
