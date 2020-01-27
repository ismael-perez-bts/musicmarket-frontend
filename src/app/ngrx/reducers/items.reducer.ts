import { createReducer, on, State } from '@ngrx/store';
import { searchItemsAction, searchItemsLoadedAction } from '../actions/items.actions';

export const defaultState = {
  items: [],
  location: { },
  loading: true,
  error: false
};

const _itemsReducer = createReducer(defaultState,
  on(searchItemsAction, (state) => ({ ...state, loading: true })),
  on(searchItemsLoadedAction, (state, { results }) => ({ ...state, items: results.items, location: results.location, loading: false }))
);

export function itemsReducer(state, action) {
  return _itemsReducer(state, action);
}