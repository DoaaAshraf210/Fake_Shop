import { createAction, props } from '@ngrx/store';

export const themeAction = createAction('theme', props<{ theme: string }>());
