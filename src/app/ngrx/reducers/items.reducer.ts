import { createReducer, on, State } from '@ngrx/store';
import { searchItemsAction, searchItemsLoadedAction } from '../actions/items.actions';

export const defaultState = {
  results: [],
  loading: false,
  error: false
};

const _itemsReducer = createReducer(defaultState,
  on(searchItemsAction, (state) => ({ ...state, loading: true })),
  on(searchItemsLoadedAction, (state, { results }) => ({ ...state, results, loading: false }))
);

export function itemsReducer(state, action) {
  return _itemsReducer(state, action);
}