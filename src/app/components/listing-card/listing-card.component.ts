import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.scss']
})
export class ListingCardComponent implements OnInit {
  @Input() item;

  constructor() { }

  ngOnInit() {
  }

}
