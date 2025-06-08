import { CanActivateFn, Router } from '@angular/router';
import { PermissionService } from '../services/permission.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const permission = inject(PermissionService);
  const router = inject(Router);


  if (permission.isAuthUser()) {
    return true; 
  } else {
    router.navigate(['/login']);
    return false; 
  }
};