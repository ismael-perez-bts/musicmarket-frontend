import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as paths from '../config/api-paths.config';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) {}
  
  public getCitiesByStateId(stateId) {
    return this.http.get(paths.cityStates(stateId));
  }
}
