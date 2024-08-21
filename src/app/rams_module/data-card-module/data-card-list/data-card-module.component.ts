import { Component, OnInit } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable/public-api';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';
import { SystemService } from 'src/app/service/system/system.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-data-card-module',
  templateUrl: './data-card-module.component.html',
  styleUrls: ['./data-card-module.component.css']
})

export class DataCardModuleComponent implements OnInit {
  serv_list: any;
  rows = [];
  filteredRows = [];
  searchvalue : any;
  access_data: any;
  userfeatures:any;
  permittedaction:any;
  permission_Denied=0;
  role_id: any;
  loading=true
  
constructor(public router:Router,
  private usr_ser:UserService,
  private systemService:SystemService,
  private translate: TranslateService) {
    this.access_data = localStorage.getItem("access_data");
    this.role_id = localStorage.getItem("us_role_id");
    this.userfeatures=JSON.parse(atob(atob(this.access_data)));
    
    this.translate.get([
      'Service Request Code',
      'Customer Name',
      'Vin Number',
      'Work Card Status',
      'Upload Status',
      'Last Updated on',
      'Action'
    ]).subscribe(translations => {
      this.cols = [
   
        { field: 'serm_number', title:translations ['Service Request Code']  },
        { field: 'cstm_name', title: translations ['Customer Name'] },
        { field: 'custveh_vinnumber', title: translations ['Vin Number'] },
        { field: 'wk_status', title: translations ['Work Card Status'] },
        { field: 'sm_name', title: translations ['Upload Status'] },
        { field: 'serm_updatedon', title: translations ['Last Updated on'] },
        { field: 'Action', title: translations ['Action'] },
      ];
    });
    
      
}
search = '';
search2 = '';

servlist() {
  this.router.navigateByUrl('/service-request-list');
}
wklist(){
  this.router.navigateByUrl('/work-card-list');
}


ngOnInit() {

  this.userfeatures.length>0?this.userfeatures.forEach((element: any) => {element['ft_id']==19?this.permittedaction=element['actions']:"";}):"";
  if(this.permittedaction&&this.permittedaction.includes('5')){
    const role_id=atob(atob(this.role_id))

      this.usr_ser.service_request_list().subscribe((rdata: any) => {
        if (rdata.ret_data === "success") {
          setTimeout(() => {
             this.serv_list=rdata.result;
            this.rows=this.serv_list;
            this.loading=false;
            this.filteredRows = this.rows;},800);
            
            
        } 
        else{
          this.loading=false;
          this.serv_list=6;
          
        }
      });
 }
  else{
    this.permission_Denied=1;
  }
}


servq_details(srid:any){
if(this.permittedaction.includes('2')){
  this.router.navigateByUrl('service-request-details/' + (btoa(srid)));
}else{
this.permission_Denied=1;
this.showMessage("Permission Denied!!!!",'error')
}

}
histdetails(id:any){
if(this.permittedaction.includes('2')){
  this.router.navigateByUrl('work-card-create/' + (btoa(id)));
}else{
this.permission_Denied=1;
this.showMessage("Permission Denied!!!!",'error')
}

}
cols = [
{ field: 'serm_number', title: 'Service Request Code' },
{ field: 'cstm_name', title: 'Customer Name' },
{ field: 'custveh_vinnumber', title: 'Vin Number' },
{ field: 'wk_status', title: 'Work Card Status' },
{ field: 'sm_name', title: 'Upload Status' },
{ field: 'serm_updatedon', title: 'Last Updated on'},
{ field: 'Action', title: 'Action' },
];


onSearch(searchValue: string) {

this.filteredRows = this.rows.filter(row => {

  return Object.values(row).some(val => (val ? val.toString().toLowerCase().includes(searchValue.toLowerCase()) : false));
});
}


dc_details(srid:any){
this.router.navigateByUrl('data-card-details/'+btoa(srid));
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

logout(){
     
this.systemService.logout().subscribe((rdata: any) => {
    if (rdata.ret_data == 'success') {
        localStorage.clear();
        this.router.navigateByUrl('/');
    }
  });

}


}
