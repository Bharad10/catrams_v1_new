import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { atob } from "buffer";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + atob(atob(atob(localStorage.getItem('us_token'))))});
  // reqHeader = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('us_token') });
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('us_token') });
  fileHeader = new HttpHeaders();


  constructor(private http: HttpClient) { }
  fetch_feature(): Observable<any> {
    return this.http.get(environment.base_url + 'fetch_feature', {headers : this.reqHeader});
}
// user_role_add(data :any): Observable<any> {
//   return this.http.post(environment.base_url + 'user_role_add',data, {headers : this.reqHeader});
// }
user_role_add(data :any): Observable<any> {
  return this.http.post(environment.base_url + 'System/UserRoleController',data, {headers : this.reqHeader});
}
user_role_update(data :any): Observable<any> {
  return this.http.post(environment.base_url + 'System/UserRoleController/update',data, {headers : this.reqHeader});
}
expense_add(data :any): Observable<any> {
  return this.http.post(environment.base_url + 'System/ExpenseMasterController',data, {headers : this.reqHeader});
}
fetch_expense(): Observable<any> {
  return this.http.get(environment.base_url + 'System/ExpenseMasterController', {headers : this.reqHeader});
}
expense_delete(data :any): Observable<any> {
  return this.http.post(environment.base_url + 'System/ExpenseMasterController/delete',data, {headers : this.reqHeader});
}

fetch_user_role(): Observable<any> {
  return this.http.get(environment.base_url + 'System/UserRoleController', {headers : this.reqHeader});
}
fetch_user_role_features( data :any): Observable<any> {
  return this.http.post(environment.base_url + 'fetch_user_role_features',data, {headers : this.reqHeader});
}
delete_user_role( data :any): Observable<any> {
  return this.http.post(environment.base_url + 'delete_user_role',data, {headers : this.reqHeader});
}
banner_list( ): Observable<any> {
  return this.http.get(environment.base_url + 'System/BannerController', {headers : this.reqHeader});
}
ban_img_upload( data :any): Observable<any> {
  return this.http.post(environment.base_url + 'ban_img_upload',data, {headers : this.fileHeader});
}
banner_create(data :any): Observable<any> {
  return this.http.post(environment.base_url + 'System/BannerController',data, {headers : this.reqHeader});
}
banner_delete(data :any): Observable<any> {
  return this.http.post(environment.base_url + 'System/BannerController/delete',data, {headers : this.reqHeader});
}
fetch_role_data(data:any): Observable<any> {
  return this.http.get(environment.base_url + 'System/UserRoleController/'+data, {headers : this.reqHeader});
}
premium_list(): Observable<any> {
  return this.http.get(environment.base_url + 'Customer/CustomerSettingsController', {headers : this.reqHeader});
}
create_pm(data:any): Observable<any> {
  return this.http.post(environment.base_url + 'Customer/CustomerSettingsController',data, {headers : this.reqHeader});
}
set_active_status(data:any): Observable<any> {
  return this.http.post(environment.base_url + 'set_active_status',data, {headers : this.reqHeader});
}
wk_settlist(): Observable<any> {
  return this.http.get(environment.base_url + 'WorkCard/WorkCardSettingsController', {headers : this.reqHeader});
}
update_wkset(data:any): Observable<any> {
  return this.http.post(environment.base_url + 'WorkCard/WorkCardSettingsController/update',data, {headers : this.reqHeader});
}
}
