import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  base_version = environment.base_version
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('us_token') });
  constructor(private http: HttpClient) { }

  save_chat(data:any){
    return this.http.post(environment.base_url + 'Chat/ChatMasterController/create',data, {headers : this.reqHeader});
  } 
  get_chat_history(data:any){
    return this.http.post(environment.base_url + 'get_chat_history',data, {headers : this.reqHeader});
  } 

  get_service_chat(data:any){
    return this.http.post(environment.base_url + 'fetch_sr_chathist',data, {headers : this.reqHeader});
  } 
  save_service_chat(data:any){
    return this.http.post(environment.base_url + 'create_service_chat',data, {headers : this.reqHeader});
  } 
  chat_image_upload(data: any) {
    if(this.base_version==='locale'){
      return this.http.post(environment.base_url + 'c_img_upload', data, { headers: this.reqHeader });
    }else{
      return this.http.post(environment.base_url + 'c_img_cUpload', data, { headers: this.reqHeader });
    }
    
    
  }
  chat_aud_upload(data: any) {
    if(this.base_version==='locale'){
    return this.http.post(environment.base_url + 'c_aud_pload', data, { headers: this.reqHeader });

    }else{
    return this.http.post(environment.base_url + 'c_aud_cUpload', data, { headers: this.reqHeader });

    }
  }
  chat_doc_upload(data: any) {
    if(this.base_version==='locale'){
    return this.http.post(environment.base_url + 'c_doc_upload', data, { headers: this.reqHeader });

    }else{
    return this.http.post(environment.base_url + 'c_doc_cUpload', data, { headers: this.reqHeader });

    }

  }
}
