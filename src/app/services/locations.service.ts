import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as paths from '../config/api-paths.config';
import { DataRequest } from '../models/request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) {}
  
  public getCitiesByStateId(stateId) {
    return this.http.get(paths.cityStates(stateId));
  }

  public getCityByCoordinates(lat, lng): Observable<DataRequest> {
    return this.http.get<DataRequest>(paths.cityByCoordinates(lat, lng));
  }
}
