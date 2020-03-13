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

  public categoryId: number;

  public searchForm: FormGroup = new FormGroup({
    keywords: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
    this.categoryId = 0;
  }

  categoryChange(val: string) {
    this.categoryId = parseInt(val, 10);
  }

  search() {
    let value = this.searchForm.value;
    value = { ...value, category: this.categoryId };
    this.searchClick.emit(value);
  }
}
