import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';



import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { AuthService } from './auth.service'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesComponent } from './messages.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile.component';
import { PostComponent } from './post.component';
import { AuthInterceptorService } from './authInterceptor.service';

const routes = [
  { path: '', component: PostComponent },
  { path: 'register', component : RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  // visualizzo profilo in base all'id
  { path: 'profile/:id', component: ProfileComponent }
]

@NgModule({
  // moduli creati
  declarations: [
    AppComponent,
    MessagesComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    ProfileComponent,
    PostComponent
  ],
  // moduli importati
  imports: [
    BrowserModule,
    HttpClientModule,
    // lo includo per poter prendere in input i dati dal form register
    FormsModule,
    RouterModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
    MatInputModule,
    MatListModule

  ],
  providers: [ApiService, AuthService,
    // intercetta le richiesta http
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
