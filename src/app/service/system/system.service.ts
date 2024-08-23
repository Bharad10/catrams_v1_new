import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {


  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('us_token') });


  constructor(private http: HttpClient) {
   }
 getapproval_list() {
  return this.http.get(environment.base_url + 'Approval/ApprovalmasterControler', {headers : this.reqHeader});
}
update_req(data: any): Observable<any> {
  return this.http.post(environment.base_url + 'Approval/ApprovalmasterControler/update',data, {headers : this.reqHeader});
} 
get_userdet(): Observable<any> {
  return this.http.get(environment.base_url + 'get_userdet', {headers : this.reqHeader});
}

update_hold_req(data:any): Observable<any> {
  return this.http.post(environment.base_url + 'update_hold_req',data, {headers : this.reqHeader});
}
get_notification(): Observable<any> {
  return this.http.get(environment.base_url + 'System/UsersNotificationController', {headers : this.reqHeader});
}
updatenotification(id:any): Observable<any> {
  return this.http.post(environment.base_url + 'System/UsersNotificationController/update',id, {headers : this.reqHeader});
}
deletenotification(id:any): Observable<any> {
  return this.http.post(environment.base_url + 'System/UsersNotificationController/delete',id, {headers : this.reqHeader});
}
clear_us_notif(data:any): Observable<any> {
  return this.http.post(environment.base_url + 'clear_us_notif',data, {headers : this.reqHeader});
}
logout(): Observable<any> {
  return this.http.get(environment.base_url + 'us_logout', {headers : this.reqHeader});
} 
damagedtoolreq_updt(data: any): Observable<any> {
  return this.http.post(environment.base_url + 'damagedtoolreq_updt',data, {headers : this.reqHeader});
} 

app_service(): Observable<any> {
  return this.http.get(environment.base_url + 'app_service', { headers: this.reqHeader });
}
request_rejected_hold(data: any): Observable<any> {
  return this.http.post(environment.base_url + 'request_rejected_hold',data, {headers : this.reqHeader});
} 
saledamaged_update(data: any): Observable<any> {
  return this.http.post(environment.base_url + 'saledamaged_update',data, {headers : this.reqHeader});
} 

edit_det(id:any): Observable<any> {
  return this.http.post(environment.base_url + 'edit_profile',id, {headers : this.reqHeader});
}
check_password(id:any): Observable<any> {
  return this.http.post(environment.base_url + 'check_password',id, {headers : this.reqHeader});
}
}