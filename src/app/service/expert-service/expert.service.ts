import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { atob } from "buffer";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  //  reqHeader =  new HttpHeaders({'Content-Type': 'application/json'});

  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('us_token') });


  fileHeader = new HttpHeaders();
  constructor(private http: HttpClient) { }

  getExpServ_det(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'vquote_details' , data, { headers: this.reqHeader });
  }
  v_quote_approval(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'v_quote_approval' , data, { headers: this.reqHeader });
  }
  vendor_payment(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'vendor_payment' , data, { headers: this.reqHeader });
  }
}
