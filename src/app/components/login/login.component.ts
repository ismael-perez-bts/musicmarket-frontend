import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FirebaseService } from '../../firebase/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() onCloseSignIn: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSignIn: EventEmitter<void> = new EventEmitter<void>();

  public loginForm: FormGroup = new FormGroup({});

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
  }

  public async signInWithGoogle(): Promise<void> {
    try {
      await this.firebase.signInWithPopup();
      this.onSignIn.emit();
    } catch(e) {

    }
  }

  public onClose(): void {
    this.onCloseSignIn.emit();
  }

  public search(): void {

  }

}
