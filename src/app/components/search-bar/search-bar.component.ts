import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() categories: Array<any>;

  public caregoryId: string = '0';

  public searchForm: FormGroup = new FormGroup({
    useCurrentLocation: new FormControl(false),
    keywords: new FormControl(''),
    category: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  search() {
    let value = this.searchForm.value;
    this.searchClick.emit(value);
  }
}
