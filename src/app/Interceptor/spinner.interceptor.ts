import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

let counter = 0;
export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  counter++;
  spinner.show();
  return next(req).pipe(
    finalize(() => {
      counter--;
      if (counter == 0) spinner.hide();
    })
  );
  return next(req);
};
