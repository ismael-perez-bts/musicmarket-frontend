import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from '../services/localstorage.service';
import { FirebaseService } from '../firebase/firebase.service'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService, private firebase: FirebaseService) {
    console.log('loaded');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.firebase.getToken();
    if (token) {
      let req = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
  
      console.log(req);
      return next.handle(req);
    }

    console.log('oh no...');
    return next.handle(request);
  }
}