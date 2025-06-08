import { CanActivateFn, Router } from '@angular/router';
import { PermissionService } from '../services/permission.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const permission = inject(PermissionService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[];

  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  if (permission.hasRole(allowedRoles)) {
    return true;
  }

  if (!permission.isAuthUser()) {
    router.navigate(['/login']);
  } else {
    router.navigate(['/home']);
  }
  return false;
};

