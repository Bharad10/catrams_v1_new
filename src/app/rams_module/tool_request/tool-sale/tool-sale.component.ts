import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgApexchartsModule } from 'ng-apexcharts/public_api';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user-service/user.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tool-sale',
  templateUrl: './tool-sale.component.html',
  styleUrls: ['./tool-sale.component.css'],
  animations: [
    trigger('toggleAnimation', [
        transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
        transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
],
})

export class ToolSaleComponent implements OnInit{

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
  search='';
  cols:any=[];
  nrq_flag:boolean=false
  open_request=0
  constructor(private router: Router,
      private usr_serv: UserService,
      private translate: TranslateService,
      public storeData: Store<any>) {
          this.access_data = localStorage.getItem("access_data");
         
        this.translate.get([
          'Order Code',
          'Customer Name',
          'Customer Phone number',
          'Last Updated On',
          'Last Updated Time',
          'Status',
          'Action'
        ]).subscribe(translations => {
          this.cols = [
       
            { field: 'order_number', title:translations ['Order Code']  },
            { field: 'cstm_name', title: translations ['Customer Name'] },
            { field: 'cstm_phone', title: translations ['Customer Phone number'] },
            { field: 'date', title: translations ['Last Updated On'] },
            { field: 'time', title: translations ['Last Updated Time'] },
            { field: 'sm_name', title: translations ['Status'] },
            { field: 'Action', title: translations ['Action'] },
          ];
        });
      
  }

  
  ngOnInit() {
  this.userfeatures=JSON.parse(atob(atob(this.access_data)));
  this.userfeatures.forEach((element: any) => {element['ft_id']==3?this.permittedaction=element['actions']:"";});
  if(this.permittedaction.includes('5')){
      this.usr_serv.fetch_order_list().subscribe((rdata: any) => {
          if (rdata.ret_data == 'success') {
              setTimeout(() => {
              this.data = rdata.data;
              this.rows=this.data;
              this.open_request=rdata.open_tickets;
              this.nrq_flag=(this.open_request!=0)?true:false
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
  sale_history(){
    this.router.navigateByUrl('tool-sale-history');

  }

 

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
