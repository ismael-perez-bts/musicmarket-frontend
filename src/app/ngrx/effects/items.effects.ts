import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, merge, exhaustMap } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { searchItems, searchItemsLoaded } from '../actions/items.actions';

@Injectable()
export class ItemsEffects {

  loadItems$ = createEffect(() => this.actions$.pipe(
      ofType(searchItems),
      exhaustMap((action: any) => this.searchService.search(action.params)
        .pipe(
          map(items => ({ type: searchItemsLoaded, results: items })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private searchService: SearchService) {}
}
