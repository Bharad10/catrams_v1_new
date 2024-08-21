import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  reqHeader =  new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient) { }
  
  user_login(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'userlogin',data , {headers : this.reqHeader});

  }
  
}
