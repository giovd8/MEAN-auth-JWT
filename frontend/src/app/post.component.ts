import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'post',
  template: `
    <mat-card>
  <mat-card-header>
    <mat-card-title>
      <h4>New post</h4>
    </mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <form>
       <mat-form-field>
        <textarea [(ngModel)]="postMsg" name="description" matInput placeholder="Post Message"></textarea>
     </mat-form-field>
     <br>
      <button (click)="post()" mat-raised-button color="primary">Post</button>
    </form>
  </mat-card-content>
</mat-card>
`
})
export class PostComponent {

  // apiSewrvice dovrebbe essere privata ma da errore
  constructor(public apiService: ApiService) {}
  postMsg='';
  post() {
    console.log(this.postMsg)
    this.apiService.postMessage({ message: this.postMsg })
  }
}
