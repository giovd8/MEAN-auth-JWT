import { Component } from '@angular/core';
import { ApiService } from './api.service';
// serve per poter importare l'id dall'url
import { ActivatedRoute } from '@angular/router';
// con profile?.email verifica prima che l'oggetto esiste, se tolgo il punto di domanda carica cmq la mail ma da errore in console
@Component({
  selector: 'login',
  template: `
  <mat-card>
  <mat-card-header>
    <mat-card-title>
      <h4>Profile</h4>
    </mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <mat-list>Name: {{ profile?.name }}</mat-list>
    <mat-list>Email: {{ profile?.email }}</mat-list>
    <mat-list>Description: {{ profile?.description }}</mat-list>
  </mat-card-content>
</mat-card>

<mat-card>
  <mat-card-header>
    <mat-card-title>
      <h4>Posts</h4>
    </mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <messages></messages>
  </mat-card-content>
</mat-card>

`
})
export class ProfileComponent {
  // aggiunto <any></any> perche altrimenti rompeva il cazzo sulla console per i campi email e password
  loginData = <any>{};

  // DI necessaria per aver accesso alle API
  constructor(private apiService: ApiService, private route: ActivatedRoute) {};

  profile: any;

  ngOnInit() {
    // prendo id dall'url, id è il  campo dichiarato  in route su app.module.ts
    const id = this.route.snapshot.params.id;
    this.apiService.getprofile(id).subscribe(data => {
      this.profile = data;
    });
  }

}
