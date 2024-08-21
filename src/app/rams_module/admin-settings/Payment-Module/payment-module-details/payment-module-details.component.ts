import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment-module-details',
  templateUrl: './payment-module-details.component.html',
  styleUrls: ['./payment-module-details.component.css']
})
export class PaymentModuleDetailsComponent {
  request_id: any;
  smid: any;
  request_list: any;
  trid: any;
  history_list: any;
  deposit_price: any;
  updated_deposit: any;
  total_amount: any;
  advance_price: any;
  updated_advance: any;
  actual_price=0.00;
  reason='';
  coupon_id: any;
  constructor(private router: Router,private activerouter: ActivatedRoute,private usr_ser: UserService) {
    let req_id =this.activerouter.snapshot.queryParamMap.get('rqid')!;

    
    this.request_id=atob(req_id);
    
    if( this.request_id){
      
      let data={
        'tr_id':this.request_id,
        'flagid':1
    }
    this.usr_ser.tool_req_details(req_id).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
           this.request_list=rdata.req_list;
           this.actual_price=this.request_list.tldt_cost;
           if(rdata.req_list.coupon_id==0){
            this.coupon_id=0
           }
           this.depositcost()
           this.advancecost()
        }else{
          let no_data_msg=rdata.Message;
        }
    });
    this.usr_ser.fetch_request_status(data).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
         this.history_list=rdata.toolrqst.history_details;
       
      }else{
        let no_data_msg=rdata.Message;
      }
  });
    }else{

    }
  }

  tooledit() {
    
    this.router.navigateByUrl('tool-request-edit/' + (btoa(this.request_id)));
}
servq_details(){
  this.router.navigateByUrl('work-card-create/'+btoa(this.request_id));
}

due_alert(){
let data={
  'tldet_id':this.request_list.tldet_id,
  'cstm_id':this.request_list.cstm_id,
  'tldt_cost':this.request_list.tldt_cost,
  'tldt_number':this.request_list.tldt_number,
  'tool_name':this.request_list.rpt_amount,
  'rpt_amount':this.request_list.rpt_amount,

}
  this.usr_ser.initiate_alert(data).subscribe((rdata: any) => {
    if (rdata.ret_data == 'success') {
      this.showMessage(' Alert Initiated.', 'success');
      setTimeout(() => window.location.reload(), 850);
     
    }else{
      let no_data_msg=rdata.Message;
    }
});
}
showMessage(msg = '', type='' ) {
  const toast: any = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      customClass: { container: 'toast' },
  });
  toast.fire({
      icon: type,
      title: msg,
      padding: '10px 20px',
  });
}

depositcost(){
  this.deposit_price=((this.request_list.tldt_cost)*(this.request_list.tool_deposit_price))/100;
  this.updated_deposit=(this.request_list.tldt_cost-this.deposit_price);
  
  this.total_amount =parseFloat(this.request_list.tldt_cost)- parseFloat(this.deposit_price);
  this.deposit_price=parseFloat(this.deposit_price).toFixed(2);
  this.updated_deposit=parseFloat(this.updated_deposit).toFixed(2);
  this.total_amount=parseFloat(this.total_amount).toFixed(2);
  
    }
  
    advancecost(){
  this.advance_price=((this.request_list.tldt_cost)*(this.request_list.tool_adv_price))/100
  
  this.total_amount =parseFloat(this.request_list.tldt_cost)- parseFloat(this.advance_price);
  
  this.updated_advance=(this.request_list.tldt_cost-this.advance_price);
  this.advance_price=parseFloat(this.advance_price).toFixed(2);
  this.updated_advance=parseFloat(this.updated_advance).toFixed(2);
  this.total_amount=parseFloat(this.total_amount).toFixed(2);
    }

    payoff(){
      {
       
        if(this.request_list.tool_deposit_id==1){
          
          
          if(this.request_list.tldt_status==5){
            const data={
              'tr_id':this.request_list.tldet_id,
              'status_id':this.request_list.tldt_status,
              'rpt_id':this.request_list.rpt_id,
              'flag_id':3,
              'reason':this.reason,
              'advance_amount':this.deposit_price,
            }
            this.usr_ser.payment_complete(data).subscribe((rdata: any) => {
              if (rdata.ret_data == 'success') {
                this.showMessage(' Waived Off.', 'success');
                setTimeout(() => this.tooledit(), 850);
               
              }else{
                let no_data_msg=rdata.Message;
              }
          });
          }
          else if(this.request_list.tldt_status==15){
            const data={
              'tr_id':this.request_list.tldet_id,
              'status_id':this.request_list.tldt_status,
              'rpt_id':this.request_list.rpt_id,
              'flag_id':2,
              'reason':this.reason,
              'advance_amount':this.updated_deposit,
            }
            this.usr_ser.payment_complete(data).subscribe((rdata: any) => {
              if (rdata.ret_data == 'success') {
                this.showMessage(' Waived Off.', 'success');
                setTimeout(() => this.tooledit(), 850);
               
              }else{
                let no_data_msg=rdata.Message;
              }
          });
          }
          
          
      
       
        }else  if(this.request_list.tool_adv_payment==1){
          if(this.request_list.tldt_status==5){
            const data={
              'tr_id':this.request_list.tldet_id,
              'status_id':this.request_list.tldt_status,
              'rpt_id':this.request_list.rpt_id,
              'flag_id':3,
              'advance_amount':this.advance_price,
              'reason':this.reason
            }
            this.usr_ser.payment_complete(data).subscribe((rdata: any) => {
              if (rdata.ret_data == 'success') {
                this.showMessage(' Waived Off.', 'success');
                setTimeout(() => this.tooledit(), 850);
               
              }else{
                let no_data_msg=rdata.Message;
              }
          });
          }else if(this.request_list.tldt_status==15){
            const data={
              'tr_id':this.request_list.tldet_id,
              'status_id':this.request_list.tldt_status,
              'rpt_id':this.request_list.rpt_id,
              'flag_id':2,
              'advance_amount':this.updated_advance,
              'reason':this.reason
            }
            this.usr_ser.payment_complete(data).subscribe((rdata: any) => {
              if (rdata.ret_data == 'success') {
                this.showMessage(' Waived Off.', 'success');
                setTimeout(() => this.tooledit(), 850);
               
              }else{
                let no_data_msg=rdata.Message;
              }
          });
          }
          
        }
          
        }
    }
}
