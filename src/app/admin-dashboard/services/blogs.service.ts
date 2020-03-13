import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as paths from '../config/paths.config';
import { Observable } from 'rxjs';
import { DataRequest } from '../../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class AdminBlogsService {

  constructor(private http: HttpClient) {}
  
  public post(form) {
    return this.http.post(paths.adminBlog, form);
  }
}
