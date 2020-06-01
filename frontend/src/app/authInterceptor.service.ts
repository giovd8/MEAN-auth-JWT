import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector){}

  intercept(req,next){
    //non ho capito il perche
    const auth = this.injector.get(AuthService);
    const authRequest = req.clone({
      // aggiungo il token di autorizzazione sull'header (visibile su network -> users ->request headers)
      headers: req.headers.set('Authorization', 'token ' + auth.token)
    })
    console.log(req);
    return next.handle(authRequest);
  }
}
