import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { searchItems } from '../../ngrx/actions/items.actions';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  public lat: Observable<string>;
  public lng: Observable<string>;
  public keywords: Observable<string>;
  public category: Observable<string>;
  public condition: Observable<string>;
  public state: Observable<string>;
  public params: Object;
  public items = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ items: any }>
  ) { 

    this.store.subscribe((data) => {
      this.items = data.items.results;
    });
  }

  ngOnInit() {
    this.lat = this.route.queryParamMap.pipe(map(params => params.get('latitude')));
    this.lng = this.route.queryParamMap.pipe(map(params => params.get('longitude')));
    this.keywords = this.route.queryParamMap.pipe(map(params => params.get('keywords')));
    this.category = this.route.queryParamMap.pipe(map(params => params.get('category')));
    this.condition = this.route.queryParamMap.pipe(map(params => params.get('condition')));
    this.state = this.route.queryParamMap.pipe(map(params => params.get('state')));

    this.route.queryParamMap.subscribe((data: any) => {
      this.params = data;
      this.store.dispatch({ type: searchItems, params: data.params });
    });
  }
}
