import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/service/user-service/user.service';
import { LightboxModule, LightboxConfig, Lightbox } from 'ngx-lightbox';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';
import { NgOptimizedImage } from '@angular/common'
import { environment } from 'src/environments/environment';
import { slideDownUp } from 'src/app/shared/animations';
import { PaymentService } from 'src/app/service/payment-service/payment.service';
import { ExpertService } from 'src/app/service/expert-service/expert.service';

declare var EasebuzzCheckout: any; 
@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css'],
  animations: [slideDownUp],})

export class VendorDetailsComponent implements OnInit{
  vendor_list: any;
  rows = [];
  filteredRows :any= [];
  searchvalue : any;
  access_data: any;
  userfeatures:any;
  permittedaction:any;
  permission_Denied=0;
  cstmid: any;
  loading = true;
  accordians1:any = 1;
  vendor_data: any;
  cust_info: any;
  accordians2:any ;
  cus_upi_id:any;
  cus_b_account:any;
  cus_ifsc:any;
  txn_data: any;
  cus_amount: any;
  txn_id: any;
  itemsPerPage:number=5
  currentPage=0
  totalPages: any;
  paginated_rows:any

 


  constructor(private router: Router,
    private usr_ser: UserService, private activerouter: ActivatedRoute,private pay_ser:PaymentService,private exp_ser:ExpertService
  ) {

    this.access_data = localStorage.getItem("access_data");
    this.cstmid = this.activerouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {

    this.userfeatures=JSON.parse(atob(atob(this.access_data)));
    this.userfeatures.forEach((element: any) => {element['ft_id']==5?this.permittedaction=element['actions']:"";});

    if(this.permittedaction.includes('5')){

      
      this.usr_ser.fetch_vendor_details({'cstm_id':atob(this.cstmid)}).subscribe((rdata: any) => {
    if (rdata.ret_data == 'success') {
      
      this.permission_Denied=0;
      setTimeout(() => {

        this.cust_info=rdata.cust_info;
        this.cus_upi_id=this.cust_info['cb_upi_id'];
        this.cus_b_account=this.cust_info['cb_acc_no'];
        this.cus_ifsc=this.cust_info['cb_ifsc_no'];
        
        this.rows=rdata.request_data;
        this.paginate_page(rdata.request_data)
        }, 1000);
        this.loading=false
    }else{
      this.loading=false
    }
  });
}else{
  this.permission_Denied=1;
}

  }

  paginate_page(filteredRows:any) {
    
    this.paginated_rows = [];
    const totalItems = filteredRows.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
  
    for (let i = 0; i < totalPages; i++) {
      const start = i * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const pageItems = filteredRows.slice(start, end);
      this.paginated_rows.push(pageItems);
    }

    console.log("paginated page-->",this.paginated_rows);
    
  }

  next_page(){



  }

  cols = [
    { field: 'serm_number', title: 'Service Code' },
    { field: 'sm_name', title: 'Status' },
    { field: 't_services', title: 'Total Services' },
    { field: 't_cost', title: 'Total Cost' },
    { field: 'v_cost', title: 'Expert Payment Status' },
    { field: 'serm_updatedon', title: 'Date' },
         ];

service_list(srid:any){
  this.router.navigateByUrl('service-request-details/' + (btoa(srid)));
}

 workcard_list(srid:any){
  this.router.navigateByUrl('work-card-edit/'+btoa(srid));
}

invm_list(srid:any){
  this.router.navigateByUrl('service-history-details/'+btoa(srid));
}

vendhist(id:any){
  
  this.router.navigateByUrl('expert-details/'+btoa(id));

}

// intiate_payment(details: any) {
//   let data = {
//     'udf1': 0,
//     'udf2': details['serm_id'],
//     'amount': details['vm_total_cost'],
//     'productinfo': environment.us_pro_info,
//     'firstname': environment.us_name,
//     'phone': environment.us_phone,
//     'email': environment.us_email,
//   };

//   this.pay_ser.initiatePayment(data).subscribe((rdata: any) => {
//     if (rdata.ret_data == 'success') {
//       let access_token = rdata.access_token; 
//       this.initiateEasebuzzPayment(rdata.access_token,rdata.payment_details);
//     } else {
//       let no_data_msg = rdata.Message;
     
//     }
//   });
// }



// initiateEasebuzzPayment(access_token: string,pay_det:any) {
//   const key = pay_det['key']; // Replace with your actual key
//   const easebuzzCheckout = new EasebuzzCheckout(key, 'test'); // for test environment pass "test"
  
//   const options = {
//     access_key: access_token,
//     onResponse: (response: any) => {
//       //console.log("response------------------->",response);
//     },
//     theme: "#123456" // color hex
//   };

//   easebuzzCheckout.initiatePayment(options);
// }

payment_response(data:any)
{

  
  data['paid_amount']=this.cus_amount
  data['txn_id']=this.txn_id
  
  let s_data={
    'data':data
  }
  
    this.exp_ser.vendor_payment(s_data).subscribe((rdata: any) => {
    if (rdata.ret_data == 'success') {

      this.showMessage('Updated','success')
      window.location.reload(); 
    } else {
      let no_data_msg = rdata.Message;
     
    }
  });
}

nextPage(currentPage:any){
  if(this.paginated_rows.length===currentPage)return;
  this.currentPage=currentPage
}
prvPage(currentPage:any){

  if(currentPage-1<0)return;
  this.currentPage=currentPage
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
}
