
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user-service/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-list-module',
  templateUrl: './inventory-list-module.component.html',
  styleUrls: ['./inventory-list-module.component.css']
})
export class InventoryListModuleComponent  implements OnInit {
  list: any;
  rows = [];
  access_data: any;
  userfeatures:any;
  permittedaction:any;
  permission_Denied=0;
  loading=true;
  base_version= (environment.base_version)
  base_img_url=this.base_version==='local'? environment.base_img_url:'';
  
  search='';
  cols:any=[];
  constructor(private router: Router,
    private translate: TranslateService,
    private usr_ser:UserService) {
      this.access_data = localStorage.getItem("access_data");
      
    this.translate.get([
      'Tool Name',
      'Tool Image',
      'Tool Quantity',
      'Sale Quantity',
      'Rent Quantity',
      'Created On',
      'Action'
    ]).subscribe(translations => {
      this.cols = [
   
        { field: 'tool_name', title:translations ['Tool Name']  },
        { field: 'tool_image', title: translations ['Tool Image'] },
        { field: 'tool_total_quantity', title: translations ['Tool Quantity'] },
        { field: 'tool_sale_quantity', title: translations ['Sale Quantity'] },
        { field: 'tool_rent_quantity', title: translations ['Rent Quantity'] },
        { field: 'Action', title: translations ['Action'] },
      ];
    });
  }
  ngOnInit(){
    this.userfeatures=JSON.parse(atob(atob(this.access_data)));
    this.userfeatures.forEach((element: any) => {element['ft_id']==3?this.permittedaction=element['actions']:"";});
    if(this.permittedaction.includes('5')){
    this.usr_ser.tool_list().subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        setTimeout(() => {
          this.list=rdata.tool_list;
          this.base_img_url=this.base_version==='local'?this.base_img_url:rdata.image_url
          this.rows=this.list; 
          this.loading=false;
          }, 1300);  
      }else{
        setTimeout(() => {
        this.loading=false;
        }, 1300);
      }
  }); }else{

  }
  
  }
  createtool(){
    this.router.navigateByUrl('tool-package-create');
  }
  
 edit(id:any) {
  
  if(this.permittedaction.includes('2')){
    this.router.navigateByUrl('inventory-edit/' + (btoa(id)));
}else{
  this.permission_Denied=1;
  this.showMessage("Permission Denied!!!!",'error')
}
  
 }
 toolrequestlist(){
  this.router.navigateByUrl('tool-request-list');

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



