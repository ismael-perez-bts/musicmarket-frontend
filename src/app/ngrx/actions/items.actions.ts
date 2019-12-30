import { createAction, props } from '@ngrx/store';
 
export const searchItems = '[Results Component] Search';
export const searchItemsAction = createAction(searchItems, props<{ params: any }>());
export const searchItemsLoaded = '[Results Component] Search Loaded';
export const searchItemsLoadedAction = createAction(searchItemsLoaded, props<{ results: any }>());