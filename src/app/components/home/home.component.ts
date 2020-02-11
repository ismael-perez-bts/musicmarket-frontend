import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DataRequest } from '../../models/request.model';
import { ItemsService } from '../../services/items.service';
import { LocalStorageService } from '../../services/localstorage.service';

/**
 * Home component.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**
   * Categories for search dropdown.
   */
  public categories: Array<any> = [];

  constructor(
    private router: Router,
    private itemsService: ItemsService,
    private localStorageService: LocalStorageService
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {
    this.getCategories();
  }

  /**
   * Gets dropdown categories.
   */
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

  /**
   * Receives object with keys to search.
   * @param form Keys to search
   */
  public async searchClick(form) {
    let navigationExtras: NavigationExtras;

    try {
      let queryParams = {};
      Object.keys(form).forEach((key) => {
        if (form[key]) {
          queryParams = { ...queryParams, [key]: form[key] };
        }
      });

      navigationExtras = { queryParams };
      this.router.navigate(['/resultados'], navigationExtras);
    } catch (e) {
      debugger;
    }
  }
}
