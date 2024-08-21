import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.css']
})
export class CustomerListPageComponent {
  cust_list: any;
  rows = [];
  filteredRows = [];
  searchvalue : any;
  access_data: any;
  userfeatures:any;
  permittedaction:any;
  permission_Denied=0;
  search='';
  loading=true;
  cols:any=[]
  constructor(private router: Router,private usr_ser:UserService,private translate: TranslateService) {
  this.access_data = localStorage.getItem("access_data");
  this.cols = [
  
    { field: 'cstr_name', title: 'Customer Type' },
    { field: 'cstm_name', title: 'Name' },
    { field: 'cstm_phone', title: 'Phone' },
    { field: 'cstm_email', title: 'Email' },
    { field: 'expert', title: 'Assign Expert'},
    { field: 'date_enrollment', title: 'Enrolled On'},
    { field: 'Action', title: 'Action' },
  ];  

  this.translate.get([
    'Customer Type',
    'Name',
    'Phone',
    'Email',
    'Assign Expert',
    'Enrolled On',
    'Action'
  ]).subscribe(translations => {
    this.cols = [
 
      { field: 'cstr_name', title:translations ['Customer Type']  },
      { field: 'cstm_name', title: translations ['Name'] },
      { field: 'cstm_phone', title: translations ['Phone'] },
      { field: 'cstm_email', title: translations ['Email'] },
      { field: 'expert', title: translations ['Assign Expert'] },
      { field: 'date_enrollment', title: translations ['Enrolled On'] },
      { field: 'Action', title: translations ['Action'] },
    ];
  });
  }
 ngOnInit() {
  this.userfeatures=JSON.parse(atob(atob(this.access_data)));
    this.userfeatures.forEach((element: any) => {element['ft_id']==5?this.permittedaction=element['actions']:"";});

    if(this.permittedaction.includes('5')){
  this.usr_ser.fetch_cust_list().subscribe((rdata: any) => {
    if (rdata.ret_data == 'success') {
      // //console.log("success");
      this.permission_Denied=0;
      setTimeout(() => {
        this.cust_list = rdata.cust_list;
        this.rows=rdata.cust_list;
        this.filteredRows = this.rows;
        this.loading=false;
        }, 1300);
       

    }else{
      setTimeout(() => {
        this.loading=false;
      }, 1300);
      
    }
  });
}else{
  this.permission_Denied=1;
}
 }
 exp_settings(){
  this.router.navigateByUrl('expert-settings');
 }
 pmc_settings(){
  this.router.navigateByUrl('customer-settings');
 }

 editcustomer(data:any) {
  // this.router.navigateByUrl('customer-edit');
  if(this.permittedaction.includes('2')){
    this.router.navigateByUrl('/customer-edit/' + (btoa(data)));
  }else{
    this.permission_Denied=1;
    this.showMessage("Permission Denied!!!!",'error')
  }
  

 }
 createcustomer(){
  if(this.permittedaction.includes('1')){
    this.router.navigateByUrl('customer-create');
  }else{
    this.permission_Denied=1;
    this.showMessage("Permission Denied!!!!",'error')
  }
  
 }
 deletecustomer(id:any){
  if(this.permittedaction.includes('3')){
    this.router.navigateByUrl('customer-create');
  }else{
    this.permission_Denied=1;
    this.showMessage("Permission Denied!!!!",'error')
  }
 }
 onSearch(searchValue: string) {
  this.filteredRows = this.rows.filter(row => {
    // Convert each row's values to lowercase for case-insensitive search
    return Object.values(row).some(val => (val ? val.toString().toLowerCase().includes(searchValue.toLowerCase()) : false));
  });
}
expertAssign(id:any,cstm_vendor_flag:any){

 
  if(this.permittedaction.includes('2')){
    

    this.usr_ser.assign_vendor( {'cstm_id':id,'cstm_vendor_flag':cstm_vendor_flag}).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        if(cstm_vendor_flag==1){this.showMessage('Assigned As Expert.', 'success');}else{ this.showMessage('Removed As Expert.', 'success');}
        setTimeout( () => {
          window.location.reload();
      }, 1200);
      }else{
  
      }
    });
  

  }else{
    this.permission_Denied=1;
    this.showMessage("Permission Denied!!!!",'error')
  }

 
 
 
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
customer_list(){
  window.location.reload();
}
}

