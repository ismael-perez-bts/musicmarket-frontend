import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { LocalStorageService } from '../../services/localstorage.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

/**
 * Profile edit view
 */
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {

  /**
   * User profile.
   */
  public profile: User;

  /**
   * Indicates if profile view should be in edit mode.
   */
  public editMode: boolean = false;

  /**
   * Files to be uploaded.
   */
  public files: NgxFileDropEntry[] = [];

  /**
   * Image preview url.
   */
  public previewUrl: string | ArrayBuffer;

  /**
   * Name to be displayed in input.
   */
  public nameForm: string;

  /**
   * File is stored here to upload.
   */
  public image: FormControl = new FormControl();

  /**
   * Class constructor.
   * @param localStorageService Local storage service
   * @param usersService Users service
   * @param route ActivatedRoute from angular.
   */
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly usersService: UsersService
  ) {

   this.getUserInfo();
  }

  /**
   * Requests user info from backend.
   */
  getUserInfo() {
    this.usersService.getSelf().subscribe(data => {
      this.profile = data.data;
      this.nameForm = data.data.name;
    }, err => {

    });
  }

  /**
   * Enters edit mode.
   */
  onEditClick() {
    this.editMode = true;
  }

  /**
   * Cancels edit mode.
   */
  onCancelEdit() {
    this.editMode = false;
  }

  /**
   * Method that executes when image is dropped in drop zone.
   * @param files Dropped files. Limit of 1.
   */
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.image.setValue(file);
          var reader = new FileReader();      
          reader.readAsDataURL(file); 
          reader.onload = (_event) => { 
            this.previewUrl = reader.result;
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  /**
   * Save updated profile.
   */
  public save() {
    if (this.nameForm.length < 2) {
      return;
    }

    let data = { name: this.nameForm, photo_url: this.profile.photo_url };
    let form = new FormData();
    form.append('data', JSON.stringify(data));

    if (this.image.value) {
      form.append('file', this.image.value);
    }

    this.usersService.updateProfile(form).subscribe(updated => {
      let storedUser = JSON.parse(this.localStorageService.getItem('profile'));
      storedUser = { ...storedUser, name: data.name }
      this.profile = updated.data;
      this.editMode = false;
      this.previewUrl = '';
      this.usersService.updateProfileSubject.next(updated.data);
    }, err => {
      debugger;
    });
  }
}

