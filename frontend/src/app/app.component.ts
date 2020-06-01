import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // DI necessaria per aver accesso alle API
  constructor(public authService: AuthService) { };

  title = 'Jolly JWT auth';
}

