import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { spinnerInterceptor } from './Interceptor/spinner.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { themeEffect } from './Store/theme/theme.effect';
import { themeReducer } from './Store/theme/theme.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([spinnerInterceptor])),
    provideAnimationsAsync(),
    provideToastr(),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 1000,
        positionClass: 'toast-top-center',
        preventDuplicates: true,
        closeButton: true,
        tapToDismiss: true,
      }),
      NgxSpinnerModule.forRoot({ type: 'ball-rotate.css' })
    ),
    provideStore({
      theme: themeReducer,
    }),
    provideEffects([themeEffect]), provideAnimationsAsync(),
  ],
};
