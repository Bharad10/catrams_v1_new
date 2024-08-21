import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('us_token') });

  constructor(private http: HttpClient) {
  }
 
  getcustomer_list() {
   return this.http.get(environment.base_url + 'Customer/CustomerMasterController', {headers : this.reqHeader});
 }
 getcustomerbyId(data: string) {
   return this.http.get(environment.base_url + 'Customer/CustomerMasterController/'+data, {headers : this.reqHeader});
 }
 cust_create(data:any){
   return this.http.post(environment.base_url + 'Customer/CustomerMasterController',data, {headers : this.reqHeader});
 } 
 cust_update(data:any){
   return this.http.post(environment.base_url + 'Customer/CustomerMasterController/update',data, {headers : this.reqHeader});
 }
 getcustomer_types() {
  return this.http.get(environment.base_url + 'get_customer_types', {headers : this.reqHeader});
}
}
