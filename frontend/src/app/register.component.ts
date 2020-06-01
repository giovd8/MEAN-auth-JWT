import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // aggiunto <any></any> perche altrimenti rompeva il cazzo sulla console per i campi email e password
  registerData = <any>{};

  // DI necessaria per aver accesso alle API
  constructor(private autService: AuthService) {};

  post() {
    // console.log(this.registerData);
    this.autService.registerUser(this.registerData);

  }
}
