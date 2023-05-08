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
    let usernameEncrypt = this.encrypt(username)

    const password = this.userForm.value.password;
    let passwordEncrypt = this.encrypt(password)

    const user = { name: usernameEncrypt, password: passwordEncrypt };

    
    this.authservice.login(user).subscribe({
      next: (response: any) => {
        const token = response.token;
        this.router.navigateByUrl('/');
      },
    });
  }

  encrypt(word: string) {
    let byteword = new TextEncoder().encode(word);
    return btoa(String.fromCharCode(...new Uint8Array(byteword)));
  }
}
