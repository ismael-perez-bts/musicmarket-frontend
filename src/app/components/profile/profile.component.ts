import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profile: any;
  public editMode: boolean = false;

  public profileForm: FormGroup = new FormGroup({});

  constructor(private localStorageService: LocalStorageService) {
    let profile = this.localStorageService.getItem('profile');

    if (profile) {
      this.profile = JSON.parse(profile);
      console.log(this.profile);
    }
  }

  ngOnInit() {

  }

  onEditClick() {
    this.editMode = true;
  }

  onCancelEdit() {
    this.editMode = false;
  }
}

