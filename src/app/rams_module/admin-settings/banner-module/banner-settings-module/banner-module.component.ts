
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-banner-module',
  templateUrl: './banner-module.component.html',
  styleUrls: ['./banner-module.component.css']
})
export class BannerModuleComponent implements OnInit {
  rows: any;
  data_array: any;
  loading=true;
  search='';
  cols:any=[];

  constructor(
    private set_serv: SettingsService,
    private router:Router,
    private translate: TranslateService
    ) {
    

  }
  

  delete_ads(id:any){
    
    this.set_serv.banner_delete( {ads_id:id}).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        window.location.reload();
        
      } else {
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
  ad_details(id:any){
    this.router.navigateByUrl('work-card-create/'+btoa(id));
}
  adminsettings(){
    this.router.navigateByUrl('admin-approval');
  }
  ad_create(){
    this.router.navigateByUrl('banner-create');

  }

  ngOnInit() {

   

    this.translate.get([
      'Advertisement Name',
      'Advertisement Type',
      'Created on',
      'Last Updated On',
      'Action'
    ]).subscribe(translations => {
      this.cols = [
   
        { field: 'ads_name', title:translations ['Advertisement Name']  },
        { field: 'ads_type', title: translations ['Advertisement Type'] },
        { field: 'ads_created_on', title: translations ['Created on'] },
        { field: 'Action', title: translations ['Action'] },
      ];
    });


    this.set_serv.banner_list().subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        setTimeout(() => {
          
        this.data_array = rdata.banner_list
        this.rows =  this.data_array;
        this.loading=false;
        }, 1300);

        

      } else {
        setTimeout(() => {
          this.loading=false;
          }, 1300);
      }
    });
  }

  custom_confirm_modal(id:any)
  {

    Swal.fire({
      icon: 'warning',
      title: 'Delete Advertisement ?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonColor:"#888ea8",
      confirmButtonText: 'Proceed',
      confirmButtonColor:"#e7515a",
      padding: '2em',
      customClass: 'sweet-alerts',
      reverseButtons:true,
      allowOutsideClick:false,
      allowEscapeKey:false
  }).then((result) => {
      if (result.value) {
        this.delete_ads(id)
          
      }
  });
  }
  
}
