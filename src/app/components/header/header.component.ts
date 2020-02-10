import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationExtras } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from '../../services/localstorage.service';
import { ItemsService } from '../../services/items.service';
import { Category } from '../../models/categories.model';
import { DataRequest } from '../../models/request.model';

/**
 * Header / navbar component.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbDropdown]
})
export class HeaderComponent {
  /**
   * Event emitter to open sign in modal.
   */
  @Output() openSignIn: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Event emitter to sign user out.
   */
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();

  /**
   * User profile.
   */
  @Input() profile: any;

  /**
   * List of categories from category dropdown.
   */
  public categories: Array<Category>;

  /**
   * Selected category to show in dropdown.
   */
  public selectedCategory: Category | null;

  /**
   * Selected category ID.
   */
  public selectedCategoryId: number | null;

  /**
   * Search keywords.
   */
  public searchString: string = '';

  /**
   * Constructor
   * @param router Router service used to redirect.
   */
  constructor(
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
    private readonly itemsService: ItemsService,
    private readonly route: ActivatedRoute
  ) { 
    this.getCategories();
  }

  /**
   * @ignore
   */
  ngOnInit() {
    
  }

  /**
   * Emits actions to open sign in modal.
   */
  public onOpenSignIn(): void {
    this.openSignIn.emit();
  }

  /**
   * Emits actions to close sign user out.
   */
  public onSignOut(): void {
    this.signOut.emit();
  }

  /**
   * Redirects to profile page.
   */
  public onViewProfile(): void {
    this.router.navigate(['/usuario']);
  }

  /**
   * Redirects to new listing page.
   */
  public redirectToNewListing(): void {
    this.router.navigate(['/vender']);
  }

  /**
   * Get's categories from backend or localstorage.
   */
  public getCategories() {
    let categories = this.localStorageService.getItem('categories');
    
    if (categories) {
      this.categories = JSON.parse(categories);
      this.getKeys();
      return;
    }

    this.itemsService.getCategories().subscribe((data: DataRequest) => {
      this.localStorageService.setItem('categories', JSON.stringify(data.data));
      this.categories = data.data;
      
      if (this.selectedCategoryId) {
        this.getKeys();
      }
    });
  }

  /**
   * Get props from param map.
   */
  private getKeys() {
    this.route.queryParamMap.subscribe((data: ParamMap) => {
      this.searchString = data.get('keywords') || '';
      this.selectedCategoryId = data.get('category') ? parseInt(data.get('category'), 10) : null;
      this.selectedCategory = this.categories.find(category => category.id === this.selectedCategoryId);
    });
  }

  /**
   * Click event when chosing category.
   * @param category Selected category
   */
  public selectCategory(category: Category | null): void {
    this.selectedCategory = category;
    this.selectedCategoryId = category.id;
  }

  /**
   * Executes new search.
   */
  public search() {
    let navigationExtras: NavigationExtras;
    let queryParams = {};

    if (this.searchString) {
      queryParams = { keywords: this.searchString };
    }

    if (this.selectedCategory) {
      queryParams = { ...queryParams, category: this.selectedCategory.id };
    }

    navigationExtras = { queryParams };

    this.router.navigate(['/resultados'], navigationExtras);
  }
}
