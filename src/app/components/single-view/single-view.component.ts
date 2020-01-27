import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss']
})
export class SingleViewComponent implements OnInit {

  constructor(private readonly itemsService: ItemsService, private readonly route: ActivatedRoute) {

    // this.itemsService.getItemById();
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getItem(id);
  }

  private getItem(id: string) {
    this.itemsService.getItemById(id).subscribe(data => {
      debugger;
    });
  }

}
