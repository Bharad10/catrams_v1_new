import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-list-module',
  templateUrl: './service-list-module.component.html',
  styleUrls: ['./service-list-module.component.css']
})
export class ServiceListModuleComponent {
serv_packages:any;
rows = [];
loading=true;
search='';
  constructor(private router: Router,
    private usr_ser: UserService){
      this.usr_ser.serv_list().subscribe((rdata: any) => {
        if (rdata.ret_data == "success") {
          this.serv_packages=rdata.all_services; 
          this.rows=this.serv_packages;
          setTimeout(() => {
            this.loading=false
          }, 1500);
        }else{
          setTimeout(() => {
            this.loading=false
          }, 1500);
        }
      });
    }

    cols = [
      { field: 'servpack_name',title:'Service Name'},
      { field: 'servpack_desc', title: 'Service Description' },
      { field: 't_recomend', title: 'Tool Recomendation' },
      { field: 'Action', title: 'Action' },
    ];
editservice(srid:any){
  this.router.navigateByUrl('service-package-edit/' + (btoa(srid)));
}
deleteservicepackage(srid:any){
  let data={
    'serv_id':srid
  }
  this.usr_ser.delete_serv_pack(data).subscribe((rdata: any) => {
    if (rdata.ret_data == "success") {
      this.showMessage("Service Deleted Successfully", 'success');
      window.location.reload();
    }
    else{
      this.showMessage("Error!!!", 'error');
    }
  });
}
servlist(){
  this.router.navigateByUrl('service-package-list');
}
createservice(){
  this.router.navigateByUrl('service-package-create');
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

    ngOnInit() {
    
    }
    adminsettings(){
      this.router.navigateByUrl('admin-approval');
    }
}
