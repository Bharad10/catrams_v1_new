
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { atob } from "buffer";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {



  //  reqHeader =  new HttpHeaders({'Content-Type': 'application/json'});

  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('us_token') });
  base_version= (environment.base_version);


  fileHeader = new HttpHeaders();
  constructor(private http: HttpClient) { }
  get_pend_tr(): Observable<any> {
    let data = null;
    return this.http.get(environment.base_url + 'get_pend_tr', { headers: this.reqHeader });
  }

  tool_create(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'tool_create', data, { headers: this.reqHeader });
  }
  stock_update(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'stock_update', data, { headers: this.reqHeader });
  }
  create_user(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'create_user', data, { headers: this.reqHeader });
  }
  fetch_request_details(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'fetch_request_details', data, { headers: this.reqHeader });
  }
  data_card_upload(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'data_card_upload', data, { headers: this.reqHeader }); 
  }
  tool_list(): Observable<any> {
    return this.http.get(environment.base_url + 'System/ToolMasterController', { headers: this.reqHeader });
  }
  fetch_tool_details(data: any): Observable<any> {
    return this.http.get(environment.base_url + 'System/ToolMasterController/' + data, { headers: this.reqHeader });
  }
  update_tool_details(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'update_tool_details', data, { headers: this.reqHeader });
  }
  delete_tool_pack(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'delete_tool_pack', data, { headers: this.reqHeader });
  }
  service_request_list(): Observable<any> {
    return this.http.get(environment.base_url + 'ServiceRequest/ServiceRequestMasterController', { headers: this.reqHeader });
  }
  getreq_by_role(): Observable<any> {
    return this.http.get(environment.base_url + 'getreq_by_role', { headers: this.reqHeader });
  }
  fetch_service_details(data: any): Observable<any> {
    return this.http.get(environment.base_url + 'ServiceRequest/ServiceRequestMasterController/' + data, { headers: this.reqHeader });
  }
  serv_list(): Observable<any> {
    return this.http.get(environment.base_url + 'System/ServiceMasterController', { headers: this.reqHeader });
  }
  delete_serv_pack(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'System/ServiceMasterController/delete', data, { headers: this.reqHeader });
  }
  fetch_service_pack(data: any): Observable<any> {
    return this.http.get(environment.base_url + 'System/ServiceMasterController/'+data, { headers: this.reqHeader });
  }
  update_serv_details(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'System/ServiceMasterController/update', data, { headers: this.reqHeader });
  }
  serv_pack_create(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'System/ServiceMasterController', data, { headers: this.reqHeader });
  }
  tool_req_accept(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'tool_req_accept', data, { headers: this.reqHeader });
  }

  tool_req_list(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'ToolRequest/ToolRequestMasterController/tool_req_list', data, { headers: this.reqHeader });
  }
  tool_req_history(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'tool_req_history', data, { headers: this.reqHeader });
  }
  tool_req_details(data: any): Observable<any> {
    return this.http.get(environment.base_url + 'ToolRequest/ToolRequestMasterController/'+ data, { headers: this.reqHeader });
  }
  fetch_request_status(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'ToolRequest/ToolRequestMasterController/fetch_request_status', data, { headers: this.reqHeader });
  }
  fetch_toolreq_hist(): Observable<any> {
    return this.http.get(environment.base_url + 'fetch_toolreq_hist', { headers: this.reqHeader });
  }
  status_master_controller(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'status_master_controller', data, { headers: this.reqHeader });
  }
  refund_calc(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'refund_calc', data, { headers: this.reqHeader });
  }
  
  initiate_alert(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'initiate_alert', data, { headers: this.reqHeader });
  }
  fetch_inspection_list(): Observable<any> {
    return this.http.get(environment.base_url + 'fetch_inspection_list', { headers: this.reqHeader });
  }
  fetch_user(): Observable<any> {
    return this.http.get(environment.base_url + 'System/UserMasterController', { headers: this.reqHeader });
  }
  fetch_order_list(): Observable<any> {
    return this.http.get(environment.base_url + 'Order/OrderMasterController', { headers: this.reqHeader });
  }
  order_history(): Observable<any> {
    return this.http.get(environment.base_url + 'order_history', { headers: this.reqHeader });
  }
  fetch_order_details(data:any): Observable<any> {
    return this.http.get(environment.base_url + 'Order/OrderMasterController/'+ data, { headers: this.reqHeader });
  }
  update_order(data:any): Observable<any> {
    return this.http.post(environment.base_url + 'Order/OrderMasterController/update', data, { headers: this.reqHeader });
  }
  update_Date(data:any): Observable<any> {
    return this.http.post(environment.base_url + 'update_Date', data, { headers: this.reqHeader });
  }
  due_Date_adjust(data:any): Observable<any> {
    return this.http.post(environment.base_url + 'due_Date_adjust', data, { headers: this.reqHeader });
  }
  order_payment(data:any): Observable<any> {
    return this.http.post(environment.base_url + 'order_payment',data, { headers: this.reqHeader });
  }
  fetch_cust_list(): Observable<any> {
    return this.http.get(environment.base_url + 'Customer/CustomerMasterController', { headers: this.reqHeader });
  }
  vendor_Assign(data:any): Observable<any> {
    return this.http.post(environment.base_url + 'vendor_Assign',data, { headers: this.reqHeader });
  }
  vendor_Assign_update(data:any): Observable<any> {
    return this.http.post(environment.base_url + 'vendor_Assign_update',data, { headers: this.reqHeader });
  }
  vendor_update(data:any): Observable<any> {
    return this.http.post(environment.base_url + 'vendor_update',data, { headers: this.reqHeader });
  }
  cust_create(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'cust_create', data, { headers: this.reqHeader });
  }
  cust_update(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'cust_update', data, { headers: this.reqHeader });
  }
  cust_details(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'getcustomerdetails', data, { headers: this.reqHeader });
  }
  qt_list(): Observable<any> {
    return this.http.get(environment.base_url + 'Quote/QuoteMasterController', { headers: this.reqHeader });
  }
  getquote_byroleid(): Observable<any> {
    return this.http.get(environment.base_url + 'getquote_byroleid', { headers: this.reqHeader });
  }
  get_quotedetails(data: any): Observable<any> {
    return this.http.get(environment.base_url + 'Quote/QuoteMasterController/' + data, { headers: this.reqHeader });
  }
  recent_quotes(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'recent_quotes' , data, { headers: this.reqHeader });
  }
  save_quote(inputData: { serm_custid: any; serm_vehid: any; serm_id: any; totalcost: number; quote_items: any; }) {
    return this.http.post(environment.base_url + 'Quote/QuoteMasterController', inputData, { headers: this.reqHeader });
  }
  update_tool_status(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'update_tool_status', data, { headers: this.reqHeader });
  }
  wk_list(): Observable<any> {
    return this.http.get(environment.base_url + 'WorkCard/WorkCardMasterController', { headers: this.reqHeader });
  }
  getwork_by_role(): Observable<any> {
    return this.http.get(environment.base_url + 'getwork_by_role', { headers: this.reqHeader });
  }
  wk_details(data: any): Observable<any> {
    return this.http.get(environment.base_url + 'WorkCard/WorkCardMasterController/' + data, { headers: this.reqHeader });
  }
  reject_request(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'reject_request', data, { headers: this.reqHeader });
  }
  accept_request(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'accept_request', data, { headers: this.reqHeader });
  }
  update_workcard(data: any) {
    return this.http.post(environment.base_url + 'Workcard/WorkCardMasterController', data, { headers: this.reqHeader });
  }
  servicestatus_update(data: any) {
    return this.http.post(environment.base_url + 'WorkCard/WorkCardMasterController/servicestatus_update', data, { headers: this.reqHeader });
  }
  delete_service(data: any) {
    return this.http.post(environment.base_url + 'WorkCard/WorkCardMasterController/delete_service', data, { headers: this.reqHeader });
  }
  add_service(data: any) {
    return this.http.post(environment.base_url + 'WorkCard/WorkCardMasterController/add_service', data, { headers: this.reqHeader });
  }
  holdjob_by_user(data: any) {
    return this.http.post(environment.base_url + 'holdjob_by_user', data, { headers: this.reqHeader });
  }
  job_assign_expert(data: any) {
    return this.http.post(environment.base_url + 'job_assign_expert', data, { headers: this.reqHeader });
  }
  hold_workcard(data: any) {
    return this.http.post(environment.base_url + 'WorkCard/WorkCardMasterController/hold_workcard', data, { headers: this.reqHeader });
  }
  workcard_unhold(data: any) {
    return this.http.post(environment.base_url + 'WorkCard/WorkCardMasterController/workcard_unhold', data, { headers: this.reqHeader });
  }
  unholdjob_by_user(data: any) {
    return this.http.post(environment.base_url + 'unholdjob_by_user', data, { headers: this.reqHeader });
  }
  fetch_history(): Observable<any> {
    return this.http.get(environment.base_url + 'fetch_history', { headers: this.reqHeader });
  }
  tlrq_img_upload(data: any) {
    return this.http.post(environment.base_url + 'tlrq_img_upload', data, { headers: this.fileHeader });
  }
  premium_approval(data: any) {
    return this.http.post(environment.base_url + 'premium_approval', data, { headers: this.reqHeader });
  }
  tool_image_upload(data: any) {
    if(this.base_version==='local'){
      return this.http.post(environment.base_url + 'tool_image_upload', data, { headers: this.fileHeader });
    }else{
      return this.http.post(environment.base_url + 'tool_image_cUpload', data, { headers: this.fileHeader });
    }
    
  }
  datacard_image_upload(data: any) {
    
    if(this.base_version==='local'){
      return this.http.post(environment.base_url + 'datacard_image_upload', data, { headers: this.fileHeader });

    }else{
      return this.http.post(environment.base_url + 'datacard_image_cUpload', data, { headers: this.reqHeader });

    }
  }
  fetch_total_hist() {
    return this.http.get(environment.base_url + 'DashBoard/DashBoardController', { headers: this.reqHeader });
  }
  check_reopen_workcard() {
    return this.http.get(environment.base_url + 'check_reopen_workcard',{ headers: this.reqHeader });
  }
  reopen_workcard(data: any) {
    return this.http.post(environment.base_url + 'reopen_workcard', data,{ headers: this.reqHeader });
  }
  fetch_specific_pay_hist(data: any) {
    return this.http.post(environment.base_url + 'fetch_specific_pay_hist', data,{ headers: this.reqHeader });
  }


  //coupoun
  coupoun_list() {
    return this.http.get(environment.base_url + 'Coupon/CouponMasterController', { headers: this.reqHeader });
  }
  delete_coupon(data: any) {
    return this.http.post(environment.base_url + 'delete_coupon', data,{ headers: this.reqHeader });
  }
  coupoun_create(data: any) {
    return this.http.post(environment.base_url + 'Coupon/CouponMasterController', data, { headers: this.reqHeader });
  }
  coupoun_details(data: any) {
    return this.http.get(environment.base_url + 'Coupon/CouponMasterController/'+ data, { headers: this.reqHeader });
  }
  coupoun_update(data: any) {
    return this.http.post(environment.base_url + 'Coupon/CouponMasterController/update', data, { headers: this.reqHeader });
  }


  reject_reason(data: any) {
    return this.http.post(environment.base_url + 'reject_reason', data, { headers: this.reqHeader });
  }
  inspection_reject(data: any) {
    return this.http.post(environment.base_url + 'ToolRequest/ToolRequestrackerControler/update', data, { headers: this.reqHeader });
  }
  fetch_us_det(data:any): Observable<any> {
    return this.http.get(environment.base_url + 'System/UserMasterController/'+ data, { headers: this.reqHeader });
  }
  update_user(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'System/UserMasterController/update',data, {headers : this.reqHeader});
  } 
  fetch_tl_hist(): Observable<any> {
    return this.http.get(environment.base_url + 'ToolRequest/ToolRequestMasterController', { headers: this.reqHeader });
  }
  fetch_sr_timeline(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'fetch_sr_timeline',data, {headers : this.reqHeader});
  } 
  serv_hist(): Observable<any> {
    return this.http.get(environment.base_url + 'serv_hist', { headers: this.reqHeader });
  }
  gethist_by_role(): Observable<any> {
    return this.http.get(environment.base_url + 'gethist_by_role', { headers: this.reqHeader });
  }
  fetch_pay(): Observable<any> {
    return this.http.get(environment.base_url + 'Payment/PaymentMasterController', { headers: this.reqHeader });
  }
  fetch_pay_hist(): Observable<any> {
    return this.http.get(environment.base_url + 'fetch_pay_hist', { headers: this.reqHeader });
  }
  tool_track_list(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'tool_track_list',data, {headers : this.reqHeader});
  } 
   update_assigne(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'update_assigne',data, {headers : this.reqHeader});
  } 
  fetch_vendors_list(): Observable<any> {
    return this.http.get(environment.base_url + 'Vendor/VendorMasterController', { headers: this.reqHeader });
  }
  fetch_vendor_details(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'fetch_vendor_details',data, {headers : this.reqHeader});
  } 
  damagedtool_insp(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'damagedtool_insp',data, {headers : this.reqHeader});
  } 
  holdreq_by_user(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'holdreq_by_user',data, {headers : this.reqHeader});
  } 
  unholdreq_by_user(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'unholdreq_by_user',data, {headers : this.reqHeader});
  } 
  serv_payment(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'serv_payment',data, {headers : this.reqHeader});
  } 
  payment_complete(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'payment_complete',data, {headers : this.reqHeader});
  } 
  toolrecomendation(data: any) {
    return this.http.post(environment.base_url + 'toolrecomendation', data, { headers: this.reqHeader });
  }
  vehicle_make_list(): Observable<any> {
    return this.http.get(environment.base_url + 'vehicle_make_list', { headers: this.reqHeader });
  }
  vehicle_model_list(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'vehicle_model_list', data,{ headers: this.reqHeader });
  }
  vehicle_varient_list(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'vehicle_varient_list', data,{ headers: this.reqHeader });
  }
  create_serm_req(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'ServiceRequest/ServiceRequestMasterController',data, { headers: this.reqHeader });
  }
  assign_vendor(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'assign_vendor', data,{ headers: this.reqHeader });
  }


}

