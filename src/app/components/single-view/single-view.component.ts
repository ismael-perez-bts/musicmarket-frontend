import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../models/item.model';
import { conditions } from '../../config/conditions.config';

/**
 * Single item view component.
 */
@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss']
})
export class SingleViewComponent implements OnInit {

  /**
   * Item information.
   */
  public item: Item;

  /**
   * Item condition.
   */
  public condition: string;

  /**
   * Component / class constructor.
   * @param itemsService Item service to request item information from backend.
   * @param route Angular ActivatedRoute service.
   */
  constructor(
    private readonly itemsService: ItemsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {

  }

  /**
   * @ignore
   */
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getItem(id);
  }

  /**
   * Requests item data from backend.
   * @param id Item ID
   */
  private getItem(id: string) {
    this.itemsService.getItemById(id).subscribe(data => {
      this.item = data.data;
      this.condition = conditions[this.item.condition.toString()];
    });
  }

  public redirectToUserProfile(userId: number) {
    this.router.navigate(['/perfil', userId]);
  }
}
