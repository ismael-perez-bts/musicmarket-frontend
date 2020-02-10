import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.scss']
})
export class HomeCategoriesComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }

  categoryRedirect(id): void {
    let navigationExtras: NavigationExtras = { queryParams: { category: id }};
    this.router.navigate(['/resultados'], navigationExtras);
  }

}
