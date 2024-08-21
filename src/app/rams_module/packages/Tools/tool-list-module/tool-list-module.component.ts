import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tool-list-module',
  templateUrl: './tool-list-module.component.html',
  styleUrls: ['./tool-list-module.component.css']
})
export class ToolListModuleComponent {
  tool_list: any;
  rows = [];
  loading=true;
  search=''
  cols:any=[];
  constructor(private router: Router,
    private translate: TranslateService,
    private usr_ser: UserService) {
      
      this.translate.get([
        'Tool Name',
        'Tool Description',
        'Tool Quantity',
        'Sale Quantity',
        'Rent Quantity',
        'Created On',
        'Action'
      ]).subscribe(translations => {
        this.cols = [
     
          { field: 'tool_name', title:translations ['Tool Name']  },
          { field: 'tool_description', title: translations ['Tool Description'] },
          { field: 'tool_total_quantity', title: translations ['Tool Quantity'] },
          { field: 'tool_sale_quantity', title: translations ['Sale Quantity'] },
          { field: 'tool_rent_quantity', title: translations ['Rent Quantity'] },
          { field: 'c_on', title: translations ['Created On'] },
          { field: 'Action', title: translations ['Action'] },
        ];
      });
  }
 
 
  ngOnInit() {
    this.usr_ser.tool_list().subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        setTimeout(() => {
          this.tool_list=rdata.tool_list;
        this.rows=this.tool_list; 
          this.loading=false;
        }, 1300);
       
        
        
      }else{
        setTimeout(() => {
          this.loading=false;
        }, 1300);
      }
    });
  }
  edittool(toolid: any) {
    this.router.navigateByUrl('tool-package-edit/' + (btoa(toolid)));
    
  }

deletetool(toolId: any){
    const data={
    'toolId':toolId
  }

  this.usr_ser.delete_tool_pack(data).subscribe((rdata: any) => {
    if (rdata.ret_data == "success") {
      this.showMessage(rdata.Message, 'success');
      setTimeout(function () {
        window.location.href = "/tool-package-list";
    }, 1000);
    }
    else{
      this.showMessage(rdata.Message, 'error');
    }
  });
  
}
toollist(){
  
  this.router.navigateByUrl('tool-package-list');
}
deletedtoolslist(){
  
  this.router.navigateByUrl('deleted-tool-package/');
}
createtool(){
  this.router.navigateByUrl('tool-package-create');
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
tool_status(id:any){
   let data={
    'tool_id':id.tool_id,
    'tool_active_flag':id.tool_active_flag,
    'tool_data':id
  }
//console.log('------------->',data);
  this.usr_ser.update_tool_status(data).subscribe((rdata: any) => {
    if (rdata.ret_data == "success") {
      this.showMessage(rdata.Message, 'success');
      setTimeout(function () {
        window.location.href = "/tool-package-list";
    }, 1000);
    }
    else{
      this.showMessage(rdata.Message, 'error');
    }
  });
}
adminsettings(){
  this.router.navigateByUrl('admin-approval');
}
}
