import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Position } from '../../models/geolocation.model';
import { DataRequest } from '../../models/request.model';
import { ItemsService } from '../../services/items.service';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public categories: Array<any> = [];

  constructor(
    private router: Router,
    private itemsService: ItemsService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.getCurrentLocation();
    this.getCategories();
  }

  private getCurrentLocation(): Promise<Position> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        // do_something(position.coords.latitude, position.coords.longitude);

        resolve(position);
      });
    });
  }

  public getCategories() {
    let categories = this.localStorageService.getItem('categories');
    
    if (categories) {
      this.categories = JSON.parse(categories);
      return;
    }

    this.itemsService.getCategories().subscribe((data: DataRequest) => {
      this.localStorageService.setItem('categories', JSON.stringify(data.data));
      this.categories = data.data;
    });
  }

  public async searchClick(formValue) {

    let { useCurrentLocation, ...form } = formValue;
    let navigationExtras: NavigationExtras;

    try {
      if (formValue.useCurrentLocation) {
        let coordData: Position = await this.getCurrentLocation();
        let { latitude, longitude } = coordData.coords;
       form = { ...form, latitude, longitude };
      }

      let queryParams = {};
      Object.keys(form).forEach((key) => {
        if (form[key]) {
          queryParams = { ...queryParams, [key]: form[key ]};
        }
      });

      navigationExtras = { queryParams };
      this.router.navigate(['/resultados'], navigationExtras);
    } catch (e) {
      debugger;
    }
  }
}
