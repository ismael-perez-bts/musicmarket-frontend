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

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isAws = request.url.match(/amazonaws/gi);

    if (isAws) {
      let headers = {
        'Content-Type': 'image/jpeg',
        'x-amz-acl': 'public-read' 
      };
      
      let req = request.clone({
        setHeaders: headers
      });

      return next.handle(req);
    }
    
    let token = this.firebase.getToken();
    let headers: { Authorization?: string } = {};

    if (token) {
      headers = {
        ...headers,
        Authorization: token
      }
    }

    let req = request.clone({
      setHeaders: headers
    });

    return next.handle(req);
  }
}
