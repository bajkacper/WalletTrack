import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let activeRequest = 0;
  const loadingService = inject(LoadingService);

  if(activeRequest === 0){
    loadingService.startLoading();
  }
  activeRequest++;

  return next(req).pipe(
    finalize(() => {
      if(activeRequest > 0){
        activeRequest--;
      }
      if(activeRequest === 0){
        loadingService.stopLoading();
      }
    })
  );
};