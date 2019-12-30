import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as paths from '../config/api-paths.config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}
  
  public search(params) {
    let url = paths.searchItems(params);
    return this.http.get(url);
  }
}