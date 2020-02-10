import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ItemsService } from '../../services/items.service';
import { Geolocation } from '../../models/geolocation.model';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-sale-view',
  templateUrl: './sale-view.component.html',
  styleUrls: ['./sale-view.component.scss']
})
export class SaleViewComponent implements OnInit {
  public previewUrl: string | ArrayBuffer;

  /**
   * Image file dropped in drop area.
   */
  public files: NgxFileDropEntry[] = [];
  public form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    condition: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    latitude: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required),
    cityId: new FormControl('', Validators.required),
    stateId: new FormControl('', Validators.required)
  });

  public image = new FormControl();

  public cityName: string;
  public stateName: string;

  constructor(
    private readonly itemsService: ItemsService,
    private readonly locationService: LocationsService
  ) { }

  ngOnInit() {
  }

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
          // Here you can access the real file
 
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
 
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

  public async onSave() {

    if (!this.form.valid) {

      return;
    }

    const item = new FormData();
    item.append('file', this.image.value);
    item.append('data', JSON.stringify(this.form.value));

    this.itemsService.post(item).subscribe(data => {
      debugger;
    }, err => {
      debugger;
    });
  }

  public async getLocation() {
    let location: Geolocation = await this.getLocationFromNavigator();
    this.form.get('longitude').setValue(location.longitude);
    this.form.get('latitude').setValue(location.latitude);

    this.locationService.getCityByCoordinates(location.latitude, location.longitude).subscribe(data => {
      this.cityName = data.data.city_name;
      this.stateName = data.data.name;
      this.form.get('cityId').setValue(data.data.city_id);
      this.form.get('stateId').setValue(data.data.state_id);
    }, err => {
      debugger;
    });
  }

  private async getLocationFromNavigator(): Promise<Geolocation> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        resolve(position.coords);
      });
    });
  }
}
