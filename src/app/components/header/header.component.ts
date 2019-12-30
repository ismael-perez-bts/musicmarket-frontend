import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

/**
 * Header / navbar component.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbDropdown]
})
export class HeaderComponent {
  /**
   * Event emitter to open sign in modal.
   */
  @Output() openSignIn: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Event emitter to sign user out.
   */
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();

  /**
   * User profile.
   */
  @Input() profile: any;

  /**
   * Constructor
   * @param router Router service used to redirect.
   */
  constructor(private router: Router) { 

  }

  /**
   * Emits actions to open sign in modal.
   */
  public onOpenSignIn(): void {
    this.openSignIn.emit();
  }

  /**
   * Emits actions to close sign user out.
   */
  public onSignOut(): void {
    this.signOut.emit();
  }

  /**
   * Redirects to profile page.
   */
  public onViewProfile(): void {
    this.router.navigate(['/perfil']);
  }

  /**
   * Redirects to new listing page.
   */
  public redirectToNewListing(): void {
    this.router.navigate(['/vender']);
  }
}
