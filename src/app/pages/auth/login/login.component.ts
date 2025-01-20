import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '../../../stores/auth.store';
import { ButtonComponent } from "../../../components/ui/button/button.component";
import { environment } from '../../../../environments/environment';
import { fadeAnimation, fadeInLeft } from '../../../shared/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonComponent, RouterLink],
  templateUrl: './login.component.html',
  animations: [fadeAnimation,]
})

export class LoginComponent {
  authStore = inject(AuthStore);

  loginForm = new FormGroup({
    email: new FormControl(environment.DEFAULT_USER, [Validators.email]),
    password: new FormControl(environment.DEFAULT_PASS, [Validators.required, Validators.minLength(1)])
  })

  onLogin() {
    const { email, password } = this.loginForm.value

    if (this.loginForm.valid && email && password) {
      this.authStore.Login(email, password)
    }
  }
}
