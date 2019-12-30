import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public setItem(prop: string, data) {
    localStorage.setItem(prop, data);
  }

  public getItem(prop: string) {
    return localStorage.getItem(prop);
  }

  public clear() {
    localStorage.clear();
  }
}