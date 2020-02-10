import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DataRequest } from '../models/request.model';
import * as paths from '../config/api-paths.config';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public updateProfileSubject = new Subject();

  constructor(private readonly http: HttpClient) {

  }

  public getUser(id: number) {
    return this.http.get(paths.userById(id));
  }

  public getSelf(): Observable<DataRequest> {
    return this.http.get<DataRequest>(paths.self);
  }

  public signIn(idToken: string) {
    return this.http.post(paths.signIn, { idToken });
  }

  public updateProfile(data): Observable<DataRequest> {
    return this.http.put<DataRequest>(paths.self, data);
  }

}