import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ItemsService } from '../../services/items.service';
import { User } from '../../models/user.model';
import { DataRequest } from '../../models/request.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile: User;

  public items: [];

  constructor(
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute,
    private readonly itemsService: ItemsService,
    private readonly router: Router
  ) {

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.usersService.getUser(parseInt(id)).subscribe((data: DataRequest) => {
      this.profile = data.data;
      this.getUserItems(data.data.uid);
    }, err => {
      debugger;
    });
  }

  /**
   * Method to get user's items.
   * @param uid User uid
   */
  private getUserItems(uid: string) {
   this.itemsService.getItemsByUserUid(uid).subscribe(data => {
     this.items = data.data;
   }, err => {
     debugger;
   });
  }

  /**
   * Redirects to single item view.
   * @param id Item ID
   */
  public viewItem(id: number): void {
    this.router.navigate(['/articulo', id]);
  }

  public sendMessage(): void {
    // this.firebase.writeData();
  }
}
