import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  styleUrls: ['admin-dashboard.component.scss'],
  template: `
    <div class="content row m-0 position-relative h-100 admin-dashboard-content">
      <admin-side-bar [navigation]="nav" class="col-lg-3 border-right p-0"></admin-side-bar>
      <div class="col-lg-9 h-100 messanger-wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})

export class AdminDashboardComponent {

  nav: any[] = [
    {
      name: 'Home Page Carousel',
      link: 'admin'
    },
    {
      name: 'Home Page Posts',
      link: 'admin'
    },
    {
      name: 'Post Article',
      link: 'post-article'
    },
  ]
  
}