import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Geolocation, Position } from '../../models/geolocation.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.getCurrentLocation();
  }

  private getCurrentLocation(): Promise<Position> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        // do_something(position.coords.latitude, position.coords.longitude);

        resolve(position);
      });
    });
  }

  public async onSearchClick(formValue) {

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
