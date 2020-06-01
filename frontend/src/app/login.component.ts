import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // aggiunto <any></any> perche altrimenti rompeva il cazzo sulla console per i campi email e password
  loginData = <any>{};

  // DI necessaria per aver accesso alle API
  constructor(private authService: AuthService) {};

  post() {
    this.authService.loginUser(this.loginData);
  }
}
