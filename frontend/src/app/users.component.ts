import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'users',
  // aggiungo link al clik sull'utente per visualizzare i dati di quest'ultimo
  //passo anche l'user id e con cursor pointer quando passo sopra si visualizza la manina
  template: `
    <div *ngFor="let user of apiService.users">
      <mat-card [routerLink]="['/profile',user._id]" style="cursor: pointer">{{ user.name }}</mat-card>
    </div>`
})
export class UsersComponent {

  // apiService dovrebbe essere privata ma da errore
  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUsers();
  }

}
