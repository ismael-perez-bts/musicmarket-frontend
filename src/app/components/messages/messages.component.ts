import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase/firebase.service';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public chats: Array<any> = [];

  public profile;

  public selectedChat;

  constructor(private readonly firebaseService: FirebaseService, private readonly localStorageService: LocalStorageService) {
    let profile = localStorageService.getItem('profile');

    if (profile) {
      this.profile = JSON.parse(profile);
    }
  }

  ngOnInit() {
    this.getChats();
  }

  private async getChatMeta(chats) {
    let keys = Object.keys(chats);
    let i = 0;
    let l = keys.length;
    let data = [];

    for (i; i < l; i++) {
      let key = keys[i];
      let ref = await this.firebaseService.firebase.database().ref(`chats/${key}`).once('value');
      let userKey = Object.keys(ref.child('users').val()).filter(key => key !== this.profile.uid)[0];

      let info = ref.val();
      info = { ...info, user: info.users[userKey], date: new Date(info.timestamp) };
      data.push(info);
    }

    this.chats = data;
  }

  private getChats() {
    let profile = this.localStorageService.getItem('profile');
    let parsed = { uid: '' };

    if (profile) {
      parsed = JSON.parse(profile);
    } else {
      return;
    }

    this.firebaseService.firebase.database().ref(`users/${parsed.uid}/chats`).once('value')
    .then(data => {
      this.getChatMeta(data.val());
    })
    .catch(err => {
      debugger;
    });
  }

}
