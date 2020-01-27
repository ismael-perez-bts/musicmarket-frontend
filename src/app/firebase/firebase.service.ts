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

    this.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.renewToken();
      }
    });
  }

  public async signInWithPopup() {
    try {
      let result = await this.firebase.auth().signInWithPopup(this.provider);
      let idToken = await firebase.auth().currentUser.getIdToken(true);
      this.localStorageService.setItem('token', result.credential.accessToken);
      this.localStorageService.setItem('idToken', idToken);
      this.localStorageService.setItem('profile', JSON.stringify(result.additionalUserInfo.profile));
    } catch (e) {
      console.log(e);
      debugger;
    }
  }

  public getToken() {
    return this.localStorageService.getItem('idToken');
  }

  public async renewToken() {
    let idToken = await firebase.auth().currentUser.getIdToken(true);
    this.localStorageService.setItem('idToken', idToken);
  }
}