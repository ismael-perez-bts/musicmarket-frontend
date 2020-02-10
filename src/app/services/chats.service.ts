import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as paths from '../config/api-paths.config';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private readonly http: HttpClient) {}

  getChatMeta(id: string) {
    return this.http.get(paths.chatOpen(id));
  }
}