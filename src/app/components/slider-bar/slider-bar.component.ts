import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-bar',
  templateUrl: './slider-bar.component.html',
  styleUrls: ['./slider-bar.component.scss']
})
export class SliderBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public slide(val) {
    console.log(val);
  }
}
