import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { searchItems } from '../../ngrx/actions/items.actions';
import { LocationsService } from '../../services/locations.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { ItemsService } from '../../services/items.service';
import { SearchQuery } from '../../models/search.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

/**
 * Search results list component.
 */
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  /**
   * Latitude of city or location to search in.
   */
  public lat: number | null;

  /**
   * Longitude of city or location to search in.
   */
  public lng: number | null;

  /**
   * Category to search in.
   */
  public category: number;

  /**
   * Item condition to search (used or new).
   */
  public condition: number;

  /**
   * Name of state to search in.
   */
  public state: string;

  /**
   * Search query params.
   */
  public params: SearchQuery;

  /**
   * List of items for sale.
   */
  public items = [];

  /**
   * State ID of of state to search in.
   */
  public stateId: number;

  /**
   * List of cities to be displayed in dropdown.
   */
  public cities = [];

  /**
   * City ID of chosen city in dropdown.
   */
  public cityId: number | null;

  /**
   * Max distance to search items in.
   */
  public distance: number | null;

  /**
   * Keywords for search.
   */
  public keywords = '';

  /**
   * Minimum price for search.
   */
  public min: number;

  /**
   * Maximum price for search.
   */
  public max: number | null;

  /**
   * List of categories for dropdown.
   */
  public categories = [];

  /**
   * Indicates sort type.
   */
  public sortBy: string;

  /**
   * Search form. Also used to set query params when updating search.
   */
  public searchForm = new FormGroup({
    latitude: new FormControl(null),
    longitude: new FormControl(null),
    category: new FormControl(0),
    condition: new FormControl(0),
    min: new FormControl(0),
    max: new FormControl(null),
    keywords: new FormControl(''),
    distance: new FormControl(''),
    sortBy: new FormControl('')
  });

  /**
   * Indicates if page is loading.
   */
  public loading: boolean = true;

  /**
   * Constructor
   * @param route Route service
   * @param store NGRX store service
   * @param locationsService Location service
   * @param localStorageService Local storage service.
   * @param itemsService Items service
   * @param router Router service
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<{ items: any }>,
    private readonly locationsService: LocationsService,
    private readonly localStorageService: LocalStorageService,
    private readonly itemsService: ItemsService,
    private readonly router: Router
  ) { 

    this.store.subscribe((data) => {
      this.items = data.items.items;
      this.loading = data.items.loading;
    });
  }

  /**
   * @ignore
   */
  ngOnInit() {
    this.getCategories();

    this.route.queryParamMap.subscribe((data: ParamMap) => {
      this.keywords = data.get('keywords');
      this.lat = data.get('lat') ? parseInt(data.get('latitude'), 10) : null;
      this.lng = data.get('lng') ? parseInt(data.get('longitude'), 10) : null;
      this.distance = data.get('distance') ? parseInt(data.get('distance'), 10) : 0;
      this.category = data.get('category') ? parseInt(data.get('category'), 10) : 0;
      this.cityId = data.get('cityId') ? parseInt(data.get('cityId'), 10) : null;
      this.condition = data.get('condition') ? parseInt(data.get('condition'), 10) : 0;
      this.stateId = data.get('stateId') ? parseInt(data.get('stateId'), 10) : null;
      this.min = data.get('min') ? parseInt(data.get('min'), 10) : 0;
      this.max = data.get('max') ? parseInt(data.get('max'), 10) : null;
      
      let sortBy = data.get('sortBy');

      if (sortBy && sortBy.match(/recent|distance|pricemin|pricemax/gi)) {
        this.sortBy = sortBy;
      } else {
        this.sortBy = 'recent';
      }

      this.searchForm.setValue({
        keywords: this.keywords,
        latitude: this.lat,
        longitude: this.lng,
        distance: this.distance,
        category: this.category,
        condition: this.condition,
        min: this.min,
        max: this.max,
        sortBy: this.sortBy
      });

      let params = {};

      data.keys.forEach(key => {
        params = { ...params, [key]: data.get(key) };
      });

      this.store.dispatch({ type: searchItems, params: params });
      this.getCities(this.stateId, false);
    });
  }

  /**
   * Gets item categories from localstorage or backend.
   */
  public getCategories() {
    let categories = this.localStorageService.getItem('categories');

    if (categories && categories.length) {
      this.categories = JSON.parse(categories);
      this.category = 0;
      return;
    }

    this.itemsService.getCategories().subscribe(data => {
      this.localStorageService.setItem('categories', JSON.stringify(data.data));
      this.categories = data.data;
      this.category = 0;
    });
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
      this.searchForm.get('latitude').setValue(null);
      this.searchForm.get('longitude').setValue(null);
      return;
    }

    this.stateId = parseInt(stateId as string, 10);

    this.locationsService.getCitiesByStateId(stateId).subscribe((data: { message: any, data: any }) => {
      if (resetCity) {
        this.cityId = data.data[0].city_id;
      }
      
      this.lat = data.data[0].lat;
      this.lng = data.data[0].lng; 
      this.cities = data.data;
      this.searchForm.get('latitude').setValue(data.data[0].lat);
      this.searchForm.get('longitude').setValue(data.data[0].lng);
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
    this.getCities(id, true);
  }

  /**
   * Category change event.
   * @param value ID of category
   */
  public categoryChange(value: string) {
    if ((value && value !== '0') || !value) {
      this.category = parseInt(value, 10);
      this.searchForm.get('category').setValue(this.category);
    } else {
      this.category = null;
      this.searchForm.get('category').setValue(0);
    }
  }

  /**
   * 
   * @param value Keywords
   */
  public keywordChange(value: string): void {
    this.keywords = value;
    this.searchForm.get('keywords').setValue(value);
  }

  /**
   * Updates maximum price filter.
   * @param value Maximum price amount.
   */
  public maxChange(value: string): void {
    this.searchForm.get('max').setValue(parseInt(value, 10));
  }

  /**
   * Updates minimum price filter.
   * @param value Minimum price.
   */
  public minChange(value: string): void {
    this.searchForm.get('min').setValue(parseInt(value, 10));
  }

  /**
   * Updates ID of condition.
   * @param value ID of condition.
   */
  public conditionChange(value: string): void {
    this.searchForm.get('condition').setValue(parseInt(value, 10));
  }

  /**
   * Updates distance amount.
   * @param value Distance amount.
   */
  public distanceChange(value: string): void {
    this.searchForm.get('distance').setValue(parseInt(value, 10));
  }

  /**
   * Changes selected city ID.
   * @param value City ID
   */
  public cityIdChange(value: string) {
    let id = parseInt(value, 10);
    let cityData = this.cities.find(city => city.city_id === id);
    this.cityId = cityData.city_id;
    this.lat = cityData.lat;
    this.lng = cityData.lng; 
    this.searchForm.get('latitude').setValue(cityData.lat);
    this.searchForm.get('longitude').setValue(cityData.lng);
  }

  /**
   * Updates route params to execute a new search.
   */
  public search() {
    let navigationExtras: NavigationExtras;
    let queryParams = {};
    let i = 0;
    let form = this.searchForm.value;
    let keys = Object.keys(form);
    let l = keys.length;

    for (i; i < l; i++) {
      let key = keys[i];
      if (form[key] && form[key] !== 0) {
        queryParams = { ...queryParams, [key]: form[key] };
      }
    }

    if (this.stateId && this.cityId) {
      queryParams = { ...queryParams, stateId: this.stateId, cityId: this.cityId };
    }

    navigationExtras = { queryParams };
    this.router.navigate(['/resultados'], navigationExtras);
  }

  public sortSearch(sortBy: string) {
    let value = this.searchForm.get('sortBy');

    if (sortBy === 'distance' && !this.cityId) {
      return;
    }

    if (value.value === sortBy) {
      return;
    }

    this.sortBy = sortBy;
    this.searchForm.get('sortBy').setValue(sortBy);
    this.search();
  }

  public viewItem(id: number): void {
    this.router.navigate(['/articulo', id]);
  }
}
