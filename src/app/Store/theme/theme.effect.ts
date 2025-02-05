import { Actions, createEffect, ofType } from '@ngrx/effects';
import { themeAction } from './theme.action';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class themeEffect {
  saveTheme: any;
  constructor(private actions$: Actions) {
    this.saveTheme = createEffect(
      () =>
        this.actions$.pipe(
          ofType(themeAction),
          tap((action) => {
            localStorage.setItem('theme', action.theme);
          })
        ),
      { dispatch: false }
    );
  }
}
