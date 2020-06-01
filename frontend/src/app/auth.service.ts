import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'

@Injectable()
export class AuthService {
  path = environment.path + '/auth';

  TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}
  // prendo il token salvato sul local storage
  get token(){
    return localStorage.getItem(this.TOKEN_KEY);
  }
  // verifico se l'utente è autenticato per switch login/logout, torno true o false grazie a !!
  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  };

  // passo al backend le info di registarzione utente
  registerUser(registerData) {
    this.http.post<any>(`${this.path}/register`, registerData).subscribe(res => {
      this.saveToken(res.token);
    })
  }
  // passo al backend le info di login utente
  loginUser(loginData) {
    this.http.post<any>(`${this.path}/login`, loginData).subscribe(res => {
      // con httpClient non serve scrivere res.json().token perche il .json() lo fa in autiomatico
      // la nuova sintassi è res['token']
      // localStorage.setItem(this.TOKEN_KEY, res.token);
      // sostituisco comando precedente chiamando una funzione per evitare ripetizione di codice
      this.saveToken(res.token);
    })
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

}
