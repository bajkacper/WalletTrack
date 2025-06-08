import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    public storageService: StorageService
  ) { }

  hasRole(allowedRoles: string[]): boolean {
    const userRole = this.storageService.get('role');
    return allowedRoles.includes(userRole);
  }

  isAuthUser():boolean {
    const userId = String( this.storageService.get('id'));
    const userRole = String(this.storageService.get('role'));

    return !!userId && !!userRole;
  }
}
