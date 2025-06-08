import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {
 private _loginStatusChanged = new BehaviorSubject<boolean>(false); 
  loginStatusChanged$: Observable<boolean> = this._loginStatusChanged.asObservable();

  constructor() { }

  notifyLoginStatusChange(): void {
    this._loginStatusChanged.next(true);
  }
}
