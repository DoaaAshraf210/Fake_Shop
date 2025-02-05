import { createReducer, on } from '@ngrx/store';
import { themeAction } from './theme.action';

let initState = localStorage.getItem('theme')
  ? localStorage.getItem('theme')
  : 'white';
export const themeReducer = createReducer(
  initState,
  on(themeAction, (state, action) => action.theme)
);
