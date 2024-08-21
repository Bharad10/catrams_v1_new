import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicerequestService } from 'src/app/service/servicerequest/servicerequest.service';
import { UserService } from 'src/app/service/user-service/user.service';
// import { IDropdownSettings} from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-work-card-create',
  templateUrl: './work-card-create.component.html',
  styleUrls: ['./work-card-create.component.css'],
  animations: [
    trigger('toggleAnimation', [
        transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
        transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
],
})

export class WorkCardCreateComponent {
    codeArr: any = [];
    params:any;
    date:any
    request_id: any;
    request_details :any;
    package_details:any;
    services:any
    user_list: any;
    key_word:any='us_firstname';
    completeflag = false;
    baseurl=environment.base_img_url;
    medias:any;
    subtotal=0
    reason='';
    tab6='home';
    loading=true;
    tab10 = 'home'
    tab11 = 'home'
    payloading=true;
    reOpenFlag= false;
    toggleCode = (name: string) => {
        if (this.codeArr.includes(name)) {
            this.codeArr = this.codeArr.filter((d: string) => d != name);
        } else {
            this.codeArr.push(name);
        }
    };

    dropdownSettings: any;
    swiper1: any;
    history_list: any;
    sub: any;
  role_id: any;
  rows: any;
  custom_cost: any;
  amounttopay: any;
    
    constructor(private router: Router,
        private activerouter: ActivatedRoute,
        private requestService:ServicerequestService,
        private usr_ser: UserService,
        private datePipe: DatePipe)  {
      this.role_id = localStorage.getItem("us_role_id");
      this.role_id=atob(atob(this.role_id));
      this.request_id = this.activerouter.snapshot.paramMap.get('id')!;
         
          if(this.request_id){
            this.usr_ser.fetch_service_details(this.request_id).subscribe((rdata: any) => {
                if (rdata.ret_data == 'success') {
                  this.request_details = rdata.result;
                  
                  this.amount(0,0)
                  this.package_details=rdata.Packages;
                  this.services=rdata.services;
                  this.medias=rdata.medias;
        this.date = this.datePipe.transform(this.request_details.serm_createdon, 'dd-MMM-yyyy hh:mm a');
        
             this.calculate_subtotal();
             this.calculate_amountopay();
                  if(rdata.services.filter((d: any) => d.sitem_status_flag !== '2').length==0) this.completeflag=true;
                }
              });
              this.usr_ser.fetch_user().subscribe((rdata: any) => {
                if (rdata.ret_data == 'success') {
                  this.user_list=rdata.user_list
          
                }
              });
              let data={
                'serm_id':this.request_id
              }
              this.usr_ser.fetch_sr_timeline(data).subscribe((rdata: any) => {
                if (rdata.ret_data == 'success') {
                    this.history_list=rdata.srqst.history_details;
                    
                  setTimeout(() => {
                    this.loading=false
                  }, 1300);
                 }else{
                   let no_data_msg=rdata.Message;
                   setTimeout(() => {
                    this.loading=false
                  }, 1300);
                 }
              });
              
          }
    }
    calculate_amountopay(){

      if(this.request_details.cstm_type==1){
        this.amounttopay=this.request_details.serm_discount_amount-this.request_details.serm_custpay_amount;
        this.amounttopay=parseFloat(this.amounttopay).toFixed(2);
      }else{
        this.amounttopay=this.request_details.serm_cost-this.request_details.serm_custpay_amount;
        this.amounttopay=parseFloat(this.amounttopay).toFixed(2);
      }

    }

    calculate_subtotal(){
        this.sub=this.request_details.serm_cost- this.request_details.serm_ad_charge_cost
        this.subtotal=(this.sub).toFixed(2)
    }
    ngAfterViewInit() {
        this.swiper1 = new Swiper('#slider1', {
            modules: [Navigation, Pagination],
            navigation: { nextEl: '.swiper-button-next-ex1', prevEl: '.swiper-button-prev-ex1' },
            pagination: {
                el: '#slider1 .swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
        });
    }

    sitems = ['sample.jpeg', 'sample2.png', 'sample3.png'];
  items: any = [];
  tax = 0;


  ngOnInit() {

    
    


  }

  addItem(){

  }

  removeItem(item: any = null) {
      this.items = this.items.filter((d: any) => d.id != item.id);
  }
  update_workcard(){
    let input_data = {
        master_data:this.request_details,
        services:this.package_details
    }
    
    this.usr_ser.update_workcard(input_data).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
            //this.showMessage('Quote sent successfully', 'success');
            setTimeout( () => {
                this.router.navigateByUrl('quotation-request-list');
            }, 800);
        }else{
           // this.showMessage('poyitt pinne vaa', 'error');
        }
      });

  }
  selectedChange(data:any){
    let inData ={
        sitem_id:data.sitem_id,
        status:data.sitem_status_flag,
        type:0,
        serm_id:data.sitem_serid
    }
       
    this.usr_ser.servicestatus_update(inData).subscribe((rdata: any) => {
       if (rdata.ret_data == 'success') {
            this.showMessage('Work Updated', 'success');
            setTimeout( () => {
                window.location.reload();
            }, 1000);
        }else{
            this.showMessage('Error', 'error');
        }
      });
    
  
  }
  startWork(id:any){
    let inData ={
        serm_id:id,
        status:28,
        type:1,  
    }     
    this.usr_ser.servicestatus_update(inData).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
            this.showMessage('Work Started', 'success');
            setTimeout( () => {
              
                this.router.navigateByUrl('work-card-list');
            }, 800);
            
        }else{
           this.showMessage('Error', 'error');
        }
      });
    
  
  }
  completeWork(id:any){
    let inData ={
        serm_id:id,
        status:29,
        type:1
    }
       
    this.usr_ser.servicestatus_update(inData).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
            this.showMessage('Work completed', 'success');
            setTimeout( () => {
                this.router.navigateByUrl('work-card-list');
            }, 1000);
        }else{
            this.showMessage('Error', 'error');
        }
      });
    
  
  }
  showMessage(msg = '', type='' ) {
    const toast: any = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
       
        customClass: { container: 'toast' },
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
}

amount(event:any,id:any){

  const bal_amount=this.request_details.serm_cost-this.request_details.serm_custpay_amount

    this.custom_cost=bal_amount;
  this.custom_cost=parseFloat(this.custom_cost).toFixed(2);


}
payoffcost(){
  
  this.loading=true;
    let inData ={
        serm_id:this.request_details.serm_id,
       total_amount:this.custom_cost,
       custom_cost:this.custom_cost,
        rpt_id:this.request_details.rpt_id,
       reason:this.reason,
    }
       
    this.usr_ser.serv_payment(inData).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.showMessage('Payment Waived Off Successfully','success')
            setTimeout( () => {
                this.router.navigateByUrl('service-request-history');
            }, 1200);
        }else{
          this.loading=false;
            this.showMessage('Server Error!!!!Please try again later.', 'error');
        }
      });
}
servhist(){
    this.router.navigateByUrl('service-request-history')
  }
  servlist(){
    this.router.navigateByUrl('service-request-list');
  
  }

  reopen_workcard(data:any){
    this.reOpenFlag=true;
    let sdata={
        serm_id:data.serm_id
    }
    this.usr_ser.reopen_workcard(sdata).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.showMessage('Work Card Reopend','success')
            setTimeout( () => {
                this.router.navigateByUrl('work-card-list');
            }, 800);
        }else{
            this.showMessage('Server Error!!!!Please try again later.', 'error');
        }
      });
    
  }

  fetch_payment_history(){
    let sdata={
      serm_id:this.request_details.serm_id
  }
    this.usr_ser.fetch_specific_pay_hist(sdata).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {

       
        setTimeout(() => {
          this.rows=rdata.payhist;
          
          this.payloading=false;
        }, 1300);
       
      }else{
          this.showMessage('Server Error!!!!Please try again later.', 'error');
      }
    });
  }

  cols = [
    { field: 'rph_created_on', title: 'Date' },
    { field: 'rph_amount', title: 'Amount' },
    { field: 'created_by', title: 'Created By' },
    { field: 't_id', title: 'Transaction ID' },
    { field: 'status', title: 'status' },
  ];

  editworkcard(id:any) {
    this.router.navigateByUrl('work-card-edit/'+btoa(id));
   }
   sendquote(srid:any,qtm_id:any) {
    this.router.navigateByUrl('/quotation-create/' + srid + '/' + qtm_id);
  }

  
}
