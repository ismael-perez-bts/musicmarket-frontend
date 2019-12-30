import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() onSearchClick: EventEmitter<any> = new EventEmitter<any>();

  public searchForm: FormGroup = new FormGroup({
    useCurrentLocation: new FormControl(false),
    keywords: new FormControl(''),
    category: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    let value = this.searchForm.value;
    this.onSearchClick.emit(value);
  }

}
