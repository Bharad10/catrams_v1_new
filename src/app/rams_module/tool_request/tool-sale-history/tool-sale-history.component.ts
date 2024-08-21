import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgApexchartsModule } from 'ng-apexcharts/public_api';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user-service/user.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tool-sale-history',
  templateUrl: './tool-sale-history.component.html',
  styleUrls: ['./tool-sale-history.component.css']
})
export class ToolSaleHistoryComponent implements OnInit{

  rows = [];
  data: any;
  store: any;
  salesByCategory:any;
  tool_open: any;
  pending: any;
  tool_pay_pend: any;
  access_data: any;
  userfeatures:any;
  permittedaction:any;
  permission_Denied=0;
  loading=true;
  constructor(private router: Router,
      private usr_serv: UserService,
      public storeData: Store<any>) {
          this.access_data = localStorage.getItem("access_data");
      
  }

  
  ngOnInit() {

  this.userfeatures=JSON.parse(atob(atob(this.access_data)));
  this.userfeatures.forEach((element: any) => {element['ft_id']==3?this.permittedaction=element['actions']:"";});
  if(this.permittedaction.includes('5')){
      this.usr_serv.order_history().subscribe((rdata: any) => {
          if (rdata.ret_data == 'success') {
              setTimeout(() => {
              this.data = rdata.data;
              this.rows=this.data;
              this.loading=false
                }, 1300); 
          }
          
           else {
             
          }setTimeout(() => {
            this.loading=false
          }, 1300);
      });
    }else{

      }
  }

  tooledit(id: any) {
      this.router.navigateByUrl('tool-sale-details/' + (btoa(id)));
  }


  cols = [
      { field: 'order_number', title: 'Order Code' },
      { field: 'cstm_name', title: 'Customer Name' },
      { field: 'cstm_phone', title: 'Customer Phone number' },
      { field: 'date', title: 'Last Updated On'},
      { field: 'time', title: 'Last Updated Time'},
      { field: 'sm_name', title: 'Status' },
      { field: 'Action', title: 'Action' },
  ];

  viewinspection_list(){
      if(this.permittedaction.includes('2')){
          this.router.navigateByUrl('tool-inspection-list')
      }else{
        this.permission_Denied=1;
        this.showMessage("Permission Denied!!!!",'error')
      }
      
  }
  tool_list(){
      window.location.reload();
  }
  viewadmin_approval(){
      
      if(this.permittedaction.includes('2')){
          this.router.navigateByUrl('admin-approval')
      }else{
        this.permission_Denied=1;
        this.showMessage("Permission Denied!!!!",'error')
      }
  }
  viewhistory(){
      
      if(this.permittedaction.includes('2')){
          this.router.navigateByUrl('tool-request-history')
      }else{
        this.permission_Denied=1;
        this.showMessage("Permission Denied!!!!",'error')
      }

  }
  viewpending(){
      if(this.permittedaction.includes('2')){
          this.router.navigateByUrl('tool-request-list')
      }else{
        this.permission_Denied=1;
        this.showMessage("Permission Denied!!!!",'error')
      }
  }
  showMessage(msg = '', type = '') {
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


}
