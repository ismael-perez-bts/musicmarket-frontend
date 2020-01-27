import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.scss']
})
export class SearchSidebarComponent implements OnInit {
  @Input() stateId;
  @Input() cities;
  @Input() cityId;
  @Input() distance;
  @Input() keywords;
  @Input() category;
  @Input() condition;
  @Input() state;
  @Input() categories;
  @Input() min;
  @Input() max;
  @Output() requestStateChange = new EventEmitter<string>();
  @Output() executeSearch = new EventEmitter<void>();
  @Output() keywordChange = new EventEmitter<string>();
  @Output() cityIdChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();
  @Output() minChange = new EventEmitter<string>();
  @Output() maxChange = new EventEmitter<string>();
  @Output() conditionChange = new EventEmitter<string>();
  @Output() distanceChange = new EventEmitter<string>();

  public showSideBar: boolean = false;

  constructor() {
    
  }

  ngOnInit() {
    console.log('stateId: ', this.stateId);
  }

  search() {
    this.executeSearch.emit();
  }

  toggleSideBar() {
    this.showSideBar = !this.showSideBar;
  }
}
