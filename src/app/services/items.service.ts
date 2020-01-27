import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as paths from '../config/api-paths.config';
import { Subscriber, Observable } from 'rxjs';
import { DataRequest } from '../models/request.model';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) {}
  
  public post(form) {
    return this.http.post(paths.items, form);
  }

  public getCategories(): Observable<DataRequest> {
    return this.http.get<DataRequest>(paths.categories);
  }

  public getItemById(id: string): Observable<DataRequest> {
    return this.http.get<DataRequest>(paths.itemById(id));
  }
}
