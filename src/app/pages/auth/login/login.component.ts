import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '../../../stores/auth.store';
import { ButtonComponent } from "../../../components/ui/button/button.component";
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authStore = inject(AuthStore);

  loginForm = new FormGroup({
    email: new FormControl('user@tmashop.test', [Validators.email]),
    password: new FormControl('32dawdA@D@!AWD@', [Validators.required, Validators.minLength(1)])
  })

  onLogin() {
    const { email, password } = this.loginForm.value

    if (this.loginForm.valid && email && password) {
      this.authStore.Login(email, password)
    }
  }
}
