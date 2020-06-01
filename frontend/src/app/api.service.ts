import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {
  // messo any perche [] rompeva il cazzo
  messages: any;
  // fix guarda getUsers() per risolvere bug precedente
  users: [];
  // incliudo il path dal file eviroment -> enviroment.ts
  path = environment.path

  constructor(private http:HttpClient){}

  // carico i messaggi ricevuti dal froontend sulla var messages
  // lui aveva message: [] e this.message = res.json;
  getMessages(userId) {
    this.http.get(this.path + '/posts/' + userId).subscribe(res => {
      this.messages = res;
    })
  }
  // post messaggio
  postMessage(message) {
    this.http.post(this.path + '/post', message).subscribe(res => {
    })
  }
  // carico lista utenti
  getUsers() {
    this.http.get<any>(this.path + '/users').subscribe(res => {
      this.users = res;
    })
  }
  // carico dettagli profilo
  getprofile(id) {
    return this.http.get(`${this.path}/profile/${id}`);
  }

}
