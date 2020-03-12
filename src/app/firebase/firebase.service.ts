import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';
import { UsersService } from '../services/users.service';
import { DataRequest } from '../models/request.model';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public firebase;
  public provider;

  private firebaseConfig = {
    apiKey: environment.fireApiKey,
    authDomain: environment.fireAuthDomain,
    databaseURL: environment.fireDatabaseURL,
    projectId: environment.fireProjectId,
    storageBucket: environment.fireStorageBucket,
    messagingSenderId: environment.fireMessagingSenderId,
    appId: environment.fireAppId,
    measurementId: environment.fireMeasurementId
  };
  

  public db;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly usersService: UsersService  
  ) {
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
      this.localStorageService.setItem('token', result.credential.accessToken);
      // let idToken = await this.firebase.auth().currentUser.getIdToken(true);
      // this.localStorageService.setItem('token', result.credential.accessToken);
      // this.localStorageService.setItem('idToken', idToken);
      let idToken = await this.renewToken();
      
      this.usersService.signIn(idToken.idToken).subscribe((data: DataRequest) => { 
        this.localStorageService.setItem('profile', JSON.stringify(data.data));
        this.usersService.updateProfileSubject.next(data);
      });
    } catch (e) {
      console.log(e);
      debugger;
    }
  }

  public getToken() {
    let tokenObj = this.localStorageService.getItem('idToken');

    if (!tokenObj) {
      return null;
    }

    let token = JSON.parse(tokenObj);
    return token.idToken;
  }

  public async renewToken() {
    let idToken = await firebase.auth().currentUser.getIdToken(true);

    if (!idToken) {
      return null;
    }

    let timeExp = new Date().getTime();
    let token = { timeExp, idToken };

    this.localStorageService.setItem('idToken', JSON.stringify(token));
    return token;
  }

  public writeData () {
    this.firebase.database().ref('conversations').set({
      from: 'n6pKm5W783Vjur22aYokkfwYstR2',
      to: 'Ww0PUEqnCHcbpSLsKm7sydP0VRE3',
      message: 'testing'
    }).then(data => {
      debugger;
    }, err => {
      debugger;
    });

    debugger;
  }
}