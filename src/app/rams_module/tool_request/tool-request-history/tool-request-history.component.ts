import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user-service/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tool-request-history',
  templateUrl: './tool-request-history.component.html',
  styleUrls: ['./tool-request-history.component.css'],
  animations: [
    trigger('toggleAnimation', [
        transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
        transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
],
})

export class ToolRequestHistoryComponent {
  rows = [];
  request_list: any;
  r_time=environment.reload_time

  constructor(public fb: FormBuilder,private usr_serv: UserService,public router:Router) {

    
  }
  cols = [
    { field: 'tldt_number', title: 'Tool Request Code' },
    { field: 'cstm_name', title: 'Customer Name' },
    { field: 'tool_name', title: 'Tool Name' },
    { field: 'tldt_updated_on', title: 'Last updated on' },
    { field: 'sm_name', title: 'Status' },
    { field: 'Action', title: 'Action' },
];
  
fetch_list(){
  this.usr_serv.fetch_tl_hist().subscribe((rdata: any) => {
    if (rdata.ret_data == 'success') {
       setTimeout(() => {this.request_list=rdata.result;
        this.rows=this.request_list;},1500);
    }else{
      let no_data_msg=rdata.Message;
      this.request_list=6;

    }
});
}
  

  viewdetails(id:any){

    this.router.navigateByUrl('tool-request-detail/' + (btoa(id)));
  }

  ngOnInit() {
     this.fetch_list()
     setInterval(() => {
      this.fetch_list();
  }, this.r_time);
  }


  viewpendingrequest(){
    this.router.navigateByUrl('tool-request-list');
  }
  tooledit(id:any) {
    this.router.navigateByUrl('tool-request-edit/' + (btoa(id)));
   }

   toolreqlist(){
    this.router.navigateByUrl('tool-request-list');
   }
}
