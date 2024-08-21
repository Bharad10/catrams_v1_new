

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { atob } from "buffer";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  //  reqHeader =  new HttpHeaders({'Content-Type': 'application/json'});

  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('us_token') });


  fileHeader = new HttpHeaders();
  constructor(private http: HttpClient) { }

  
  initiatePayment(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'initiatePayment' , data, { headers: this.reqHeader });
  }
 
}
