import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-side-bar',
  styleUrls: ['side-bar.component.scss'],
  template: `
    <div>
      <h4 class="px-3 py-1 text-center border-bottom mb-0">
        Admin Dashboard
      </h4>
      <nav>
        <a
          class="sidebar-link px-3 py-2 border-bottom mb-0 w-100"
          *ngFor="let item of navigation"
          [routerLink]="item.link"
          routerLinkActive="active">
          {{ item.name }}
        </a>
      </nav>
    </div>
  `
})

export class SideBarComponent {
  @Input()
  navigation: any[];
}