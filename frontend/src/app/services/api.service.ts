import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointKeys, Endpoints, lambda } from './endpoints';
import { Observable } from 'rxjs';
import { RequestOptions } from '../models/request-options';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  request<T = any>(url: EndpointKeys, method: string, payload?: object, urlParams?: any, options: RequestOptions = {}): Observable<T>{
    let finalUrl: string;

    if(!urlParams){
      finalUrl = <string>Endpoints[url];
    }
    else{
      finalUrl = (<lambda><unknown>Endpoints[url])(urlParams); 
    }

    const allOptions: RequestOptions & { body?: any } = { ...options };
    if (payload) {
      allOptions.body = payload;
    }

    return this.http.request<T>(method, finalUrl, allOptions);
  }
}