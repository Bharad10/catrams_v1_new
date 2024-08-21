import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicerequestService {

  reqHeader =  new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
   }
}
