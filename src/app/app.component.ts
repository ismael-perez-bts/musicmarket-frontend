import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/localstorage.service';
import { Subscription } from 'rxjs';
import { UsersService } from './services/users.service';

/**
 * Main component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * App title.
   */
  public title: string = 'estoreFE';

  /**
   * Indicates if login window should be shown.
   */
  public showLogin: boolean = false;

  /**
   * User profile.
   */
  public profile: any;

  /**
   * Profile subscription in case profile is updated.
   */
  private profile$: Subscription;

  /**
   * 
   * @param localStorageService Local storage service
   * @param usersServices Users service.
   */
  constructor(private localStorageService: LocalStorageService, private readonly usersServices: UsersService) {}

  /**
   * @ignore
   */
  ngOnInit() {
    this.checkStatus();
    this.profile$ = this.usersServices.updateProfileSubject.subscribe(data => {
      this.profile = data;
      debugger;
    });
  }

  /**
   * Method to show login window.
   */
  public onShowLogin(): void {
    this.showLogin = true;
  }

  /**
   * Method to close login window.
   */
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

  /**
   * Checks status if user is logged in. If so, stores profile in local storage.
   */
  private checkStatus(): void {
    let profile: string = this.localStorageService.getItem('profile');

    if (profile) {
      this.profile = JSON.parse(profile);
    } else {
      this.profile = null;
    }
  }
}
