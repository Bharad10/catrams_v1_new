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


@Component({
  selector: 'app-vendor-management-settings',
  templateUrl: './vendor-management-settings.component.html',
  styleUrls: ['./vendor-management-settings.component.css']
})
export class VendorManagementSettingsComponent implements OnInit{
  vendor_list: any;
  rows = [];
  filteredRows = [];
  searchvalue : any;
  access_data: any;
  userfeatures:any;
  permittedaction:any;
  permission_Denied=0;
  loading=true;
  constructor(private router: Router,
    private usr_ser: UserService, private activerouter: ActivatedRoute,
  ) {
    this.access_data = localStorage.getItem("access_data");


  }
  ngOnInit() {
    this.userfeatures=JSON.parse(atob(atob(this.access_data)));
    this.userfeatures.forEach((element: any) => {element['ft_id']==5?this.permittedaction=element['actions']:"";});

    if(this.permittedaction.includes('5')){
      this.usr_ser.fetch_vendors_list().subscribe((rdata: any) => {
    if (rdata.ret_data == 'success') {
      // //console.log("success");
      this.permission_Denied=0;
      setTimeout(() => {
        this.vendor_list = rdata.vend_list;
        this.rows=rdata.vend_list;
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
  adminsettings(){
    this.router.navigateByUrl('admin-approval');
  }

  cols = [
  
    
    { field: 'cstm_name', title: 'Expert Name'},
    { field: 'cstm_phone', title: 'Phone' },
    { field: 't_request', title: 'Total Request Assigned' },
    { field: 'Action', title: 'Action' },
  ];  

  onSearch(searchValue: string) {
    this.filteredRows = this.rows.filter(row => {
      // Convert each row's values to lowercase for case-insensitive search
      return Object.values(row).some(val => (val ? val.toString().toLowerCase().includes(searchValue.toLowerCase()) : false));
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
  customer_list(){
    window.location.reload();
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

   expertAssign(id:any,type:any){

    if(this.permittedaction.includes('2')){
     
      let data={
        'cstm_id':id
      }
      
    if(type==1){
      this.usr_ser.vendor_Assign(data).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.showMessage('Assigned As Expert.', 'success');
          setTimeout( () => {
            window.location.reload();
        }, 1200);
        }else{
    
        }
      });
    }else{
      this.usr_ser.vendor_Assign_update(data).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.showMessage('Removed As Expert.', 'success');
          setTimeout( () => {
            window.location.reload();
        }, 1200);
          
           
        }else{
    
        }
      });
    }
  
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
    
    this.router.navigateByUrl('expert-details/'+ btoa(id));

  }
  

}

