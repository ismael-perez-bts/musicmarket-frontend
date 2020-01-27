import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  @Input() stateId;
  @Input() cities = [];
  @Input() cityId;
  @Output() requestStateData = new EventEmitter<string>();
  @Output() cityIdChange = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit() {
    console.log('stateId: ', this.stateId);
  }

  stateChange(value: string) {
    this.requestStateData.emit(value);
  }
}
