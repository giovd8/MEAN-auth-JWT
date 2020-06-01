import { Component } from '@angular/core';
import { ApiService } from './api.service';
// serve per poter importare l'id dall'url
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'messages',
  template: `
    <div *ngFor="let message of apiService.messages">
      <mat-card>{{ message.message }}</mat-card>
    </div>`
})
export class MessagesComponent {

  // apiSewrvice dovrebbe essere privata ma da errore
  constructor(public apiService: ApiService, public route: ActivatedRoute) { }

  ngOnInit() {
    // prendo id dall'url, id è il  campo dichiarato  in route su app.module.ts
    const userId = this.route.snapshot.params.id;
    this.apiService.getMessages(userId);
  }

}
