import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ItemsService } from '../../services/items.service';
import { Geolocation } from '../../models/geolocation.model';
import { LocationsService } from '../../services/locations.service';
import { DataRequest } from 'src/app/models/request.model';
import { FirebaseService } from '../../firebase/firebase.service';


@Component({
  selector: 'app-sale-view',
  templateUrl: './sale-view.component.html',
  styleUrls: ['./sale-view.component.scss']
})
export class SaleViewComponent implements OnInit {
  public previewUrl: string | ArrayBuffer;
  public stateId: number;
  public cityId: number;

  /**
   * List of cities to be displayed in dropdown.
   */
  public cities = [];

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
    stateId: new FormControl('', Validators.required),
    imageName: new FormControl('', Validators.required)
  });

  public image = new FormControl();

  public cityName: string;
  public stateName: string;

  constructor(
    private readonly itemsService: ItemsService,
    private readonly locationsService: LocationsService,
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly firebaseService: FirebaseService
  ) {
    this.stateId = 0;
  }

  ngOnInit() {
    this.firebaseService.renewToken();
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

          this.form.get('imageName').setValue(file.name);
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

  /**
   * Gets cities for selected state.
   * @param stateId State ID
   * @param resetCity Indicates if city should be set to 1.
   */
  private getCities(stateId: number | string, resetCity: boolean) {

    if (!stateId || stateId === '0') {
      this.cities = [];
      this.stateId = 0;
      this.cityId = 0;
      this.form.get('latitude').setValue(null);
      this.form.get('longitude').setValue(null);
      return;
    }

    this.stateId = parseInt(stateId as string, 10);

    this.locationsService.getCitiesByStateId(stateId).subscribe((data: { message: any, data: any }) => {
      if (resetCity) {
        this.cityId = data.data[0].city_id;
      }
      
      this.cities = data.data;
      this.form.get('latitude').setValue(data.data[0].lat);
      this.form.get('longitude').setValue(data.data[0].lng);
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Requests state change and requests new cities list.
   * @param id 
   */
  public requestStateChange(id: string) {
    this.stateId = parseInt(id, 10);
    this.form.get('stateId').setValue(this.stateId);

    if (!this.stateId) {
      this.cityId = 0;
      this.form.get('cityId').setValue(0);
      this.cities = [];
      this.form.get('latitude').setValue('');
      this.form.get('longitude').setValue('');
      return;
    }

    this.getCities(id, true);
  }

  /**
   * Method to change city id.
   * @param value City ID
   */
  public cityIdChange(value) {
    let id = parseInt(value, 10);
    let cityData = this.cities.find(city => city.city_id === id);
    this.cityId = cityData.city_id;
    this.form.get('cityId').setValue(this.cityId);
    this.form.get('latitude').setValue(cityData.lat);
    this.form.get('longitude').setValue(cityData.lng);
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

    this.itemsService.post(this.form.value).subscribe((data: DataRequest) => {
      let results = data.data.results;
      let signedToken = data.data.signedToken;
      this.uploadImage(signedToken, results.id);
    }, err => {
      debugger;
    });
  }

  public uploadImage(signedToken, id) {
    let file = this.image.value;
    let image = new Blob([file]);

    this.http.put(signedToken, image).subscribe(result => {
      this.router.navigate(['/articulo', id]);
    }, err => {
      debugger;
    });
  }

  public async getLocation() {
    let location: Geolocation = await this.getLocationFromNavigator();
    this.form.get('longitude').setValue(location.longitude);
    this.form.get('latitude').setValue(location.latitude);

    this.locationsService.getCityByCoordinates(location.latitude, location.longitude).subscribe(data => {
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
