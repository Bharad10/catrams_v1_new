import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user-service/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
@Component({
  selector: 'app-tool-request-page',
  templateUrl: './tool-request-page.component.html',
  styleUrls: ['./tool-request-page.component.css'],
  animations: [
    trigger('toggleAnimation', [
      transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
      transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
  ],
})
export class ToolRequestPageComponent {
  request_list: any;
  tab18: string = 'home';
  reason= '';
  rejectreason='';
  baseurl=environment.base_img_url;
  charges=0;
  expense_list: any;
  
  constructor(public fb: FormBuilder, private usr_serv: UserService, public router: Router,private set_serv:SettingsService) {

    this.usr_serv.get_pend_tr().subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.request_list = rdata.req_list;
      } else {
        let no_data_msg = rdata.Message;
      }
    });

    this.set_serv.fetch_expense().subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.expense_list = rdata.exp_data;
      } else {
        let no_data_msg = rdata.Message;
      }
    });
  }
  displayType = 'grid';
  viewdetails() {
  }
  acceptrequest(data: any) {
    
    let t_details = {
      data: data,
     };
    

    this.usr_serv.tool_req_accept(t_details).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.showMessage(rdata.Message, 'success');
       
          this.router.navigateByUrl('tool-request-list');
        
        
      }
      else {
        this.showMessage(rdata.Message, 'success');
        this.router.navigateByUrl('tool-request-list');

      }
    });
  }

  
  deletereq(id: any) {
    let data = {
      'data': id,
      'flag': 1,
    'rejectreason':this.rejectreason
    }
    
    
    
    this.usr_serv.tool_req_accept(data).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.showMessage(rdata.Message, 'success');
        this.router.navigateByUrl('tool-request-list');
      }
      else {
        this.showMessage(rdata.Message, 'success');
      }
    });
    
  }
  showMessage(msg = '', type = 'success') {
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

  reject_inspcetion(id: any) {

    let data = {
      tr_id: id,
      reason: this.reason
    }
    

    // this.usr_serv.reject_reason(data).subscribe((rdata: any) => {
    //   if (rdata.ret_data == 'success') {
    //     this.request_list = rdata.request_data;
    //   } else {
    //     let no_data_msg = rdata.Message;
    //   }
    // });
  }


  serv_page(){
    window.location.href;
  }
  toolrequestlist(){
    this.router.navigateByUrl('tool-request-list');
  }

  charges_change(type:any){
    if(type==0){
      this.charges=1;
    }else{
      this.charges=0;
    }

  }
  selectEvent(event:any){
let data={
  data:event.target.value,

}
    // this.usr_serv.update_assigne(data).subscribe((rdata: any) => {
    //   if (rdata.ret_data === 'success') {
       
    //     window.location.reload();

    //   } else {
      
        
    //   }
    // });
    


}
}