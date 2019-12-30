import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'estoreFE';
  public showLogin: boolean = false;
  public profile: any;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.checkStatus();
  }

  public onShowLogin(): void {
    this.showLogin = true;
  }

  public onCloseLogin(): void {
    this.showLogin = false;
  }

  public onSignOut(): void {
    this.localStorageService.clear();
    this.checkStatus();
  }

  public onSignIn(): void {
    this.checkStatus();
    this.showLogin = false;
  }

  private checkStatus(): void {
    let profile: string = this.localStorageService.getItem('profile');

    if (profile) {
      this.profile = JSON.parse(profile);
    } else {
      this.profile = null;
    }
  }
}
