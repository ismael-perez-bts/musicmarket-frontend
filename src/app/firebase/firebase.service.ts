import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public firebase;
  public provider;
  private firebaseConfig = {
    apiKey: "AIzaSyDJ7c9dwbB0Tuzjm0fmJelLANKwAEf6r28",
    authDomain: "libro-solfeo.firebaseapp.com",
    databaseURL: "https://libro-solfeo.firebaseio.com",
    projectId: "libro-solfeo",
    storageBucket: "libro-solfeo.appspot.com",
    messagingSenderId: "240699576800",
    appId: "1:240699576800:web:cd53f13746b218013e5b85",
    measurementId: "G-B7TNX7Y8DG"
  };

  constructor(private localStorageService: LocalStorageService) {
    this.firebase = firebase;

    this.firebase.initializeApp(this.firebaseConfig);
    this.provider = new firebase.auth.GoogleAuthProvider();
  }

  public async signInWithPopup() {
    try {
      let result = await this.firebase.auth().signInWithPopup(this.provider);
      let idToken = await this.firebase.auth().currentUser.getIdToken();

      this.localStorageService.setItem('accessToken', result.credential.accessToken);
      this.localStorageService.setItem('idToken', result.credential.idToken);
      this.localStorageService.setItem('profile', JSON.stringify(result.additionalUserInfo.profile));

      console.log(result);
      console.log(idToken);
    } catch (e) {
      console.log(e);
      debugger;
    }
      // .then(result => {
      //   console.log('result: ', result);
      //   debugger;
      // })
      // .catch(err => {
      //   console.log('error', err);
      //   debugger;
      // });
  }
}