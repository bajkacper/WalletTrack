import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  isBrowser?: boolean; 
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  set(key: string, value: any){
    if(!value || !this.isBrowser) return ;
    const val = JSON.stringify(value); 
    localStorage.setItem(key, val); 
  }

  get(key: string){
    if(!this.isBrowser) return ; 
    const stringValue: string | null = localStorage.getItem(key); 
    if(stringValue) return JSON.parse(stringValue);
  }

  remove(key:string){
    if(!this.isBrowser) return ; 
    localStorage.removeItem(key); 
  }
}