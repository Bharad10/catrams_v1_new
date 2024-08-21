import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-payment-module',
  templateUrl: './payment-module.component.html',
  styleUrls: ['./payment-module.component.css']
})
export class PaymentModuleComponent {
  rows: any;
  pay_array: any;
  search=''
  loading=true
  loading1=true
  viewhist=0;
  paydata: any;
  rows1: any;
  cols:any=[]
  cols1:any=[]

  constructor(private usr_ser: UserService,
    private translate: TranslateService,
              private router:Router) {
  this.viewtracker(0);
 
  this.translate.get([
    
    'Customer Name',
    'Request',
    'Request ID',
    'Current Status',
    'Last Created on',
    'Last Created time',
    'Action'
  ]).subscribe(translations => {
    this.cols = [
 
      { field: 'cstm_name', title:translations ['Customer Name']  },
      { field: 'r_type', title: translations ['Request'] },
      { field: 'r_id', title: translations ['Request ID'] },
      { field: 'sm_name', title: translations ['Current Status'] },
      { field: 'rpt_created_on', title: translations ['Last Created on'] },
      { field: 'rpt_created_time', title: translations ['Last Created time'] },
      { field: 'Action', title: translations ['Action'] },
    ];
  });

  
  this.translate.get([
    
    'Customer Name',
    'Request',
    'Request ID',
    'Amount',
    'Transaction ID',
    'Status',
    'Created on',
    'Action'
  ]).subscribe(translations => {
    this.cols1 = [
 
      { field: 'cstm_name', title:translations ['Customer Name']  },
      { field: 'rph_type', title: translations ['Request'] },
      { field: 'r_id', title: translations ['Request ID'] },
      { field: 'rph_amount', title: translations ['Amount'] },
      { field: 'rph_transaction_id', title: translations ['Transaction ID'] },
      { field: 'sm_name', title: translations ['Status'] },
      { field: 'rph_created_on', title: translations ['Created on'] },
      { field: 'Action', title: translations ['Action'] },
    ];
  });

  }
  

  rent_details( rqid:any){
    this.router.navigate(['payment-details'], {
      queryParams: {
        rqid: btoa(rqid)
      },})
  }
  p_order_details( rqid:any){
    this.router.navigateByUrl('tool-sale-details/' + (btoa(rqid)));
  }

  serv_details( rqid:any){
    this.router.navigateByUrl('work-card-create/'+btoa(rqid));
  }



order_details(rpt_type:any, rqid:any,sm_pk_id:any){
  
if(sm_pk_id==1){
  this.router.navigateByUrl('work-card-create/'+btoa(rqid));

}else if(sm_pk_id==0){
  this.router.navigate(['payment-details'], {
    queryParams: {
      rqid: btoa(rqid),
      smid: btoa(sm_pk_id )
    },})

}else{
  this.router.navigateByUrl('tool-sale-details/' + (btoa(rqid)));


}
}

  pay_details(rqid:any,rph_type:any){
    if(rph_type==1){
     
      this.router.navigate(['payment-details'], {
        queryParams: {
          rqid: btoa(rqid),
          smid: btoa(rph_type)
        },
    });

    }
    else if(rph_type==0){ 
      this.router.navigateByUrl('work-card-create/'+btoa(rqid));

    }else{
      this.router.navigateByUrl('tool-sale-details/' + (btoa(rqid)));
    }
  }
  adminsettings(){
    this.router.navigateByUrl('admin-approval');
  }
  viewtracker(type:any){
    if(type==1){
      this.loading=true
      this.viewhist=0;
      this.usr_ser.fetch_pay().subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          // //console.log("success");
          this.pay_array = rdata.pay_array
          this.rows =  this.pay_array;
  
  setTimeout(() => {
    this.loading=false
      }, 1300); 
  
        } else {
          setTimeout(() => {
            this.loading=false
              }, 1300); 
        }
      });
    }else{
      this.loading=true
      this.viewhist=1;
      this.usr_ser.fetch_pay_hist().subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.paydata = rdata.paydata
          this.rows1 =  this.paydata;
  
  setTimeout(() => {
    this.loading=false
      }, 1300); 
  
        } else {
          setTimeout(() => {
            this.loading=false
              }, 1300); 
        }
      });
    }
    
  }

  
  
}
