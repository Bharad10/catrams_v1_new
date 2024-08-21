import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
@Component({
  selector: 'app-user-role-settings',
  templateUrl: './user-role-settings.component.html',
  styleUrls: ['./user-role-settings.component.css']
})

export class UserRoleSettingsComponent {
  rows = [];

  userrole: any;
  userroledata: any;
  loading=true;
  search=''

  constructor(private set_serv: SettingsService, private router: Router) {
    this.set_serv.fetch_user_role().subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        setTimeout(() => {
          let dataroles = rdata.UserRoles;
          this.userroledata = dataroles;
          this.userrole = dataroles;
          this.rows=this.userrole;
          this.loading=false   
        }, 1300);

      }else{
        setTimeout(() => {
          this.loading=false   
        }, 1300);
      }
    });
  }
  search2 = '';
  ngOnInit() {

  }
addrole(){
  this.router.navigateByUrl('user-role-add');
}
  edituserroles(roleId: any) {
    this.router.navigateByUrl('user-role-edit/' + (btoa(roleId)));
  }

  deleteuserroles(roleId: any) {
    let roleid={
roleid :roleId
    }
    this.set_serv.delete_user_role(roleid).subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        this.showMessage('Role Deleted.', 'success');
        setTimeout(function () {
          window.location.href = "/user-role-settings";
      }, 1000);
      }
      else{
        this.showMessage(rdata.Message, 'error');
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

cols = [
  { field: 'role_name', title: 'Role Name' },
  { field: 'role_description', title: 'Role Description' },
  { field: 'r_time', title: 'Role Created on' },
  { field: 'Action', title: 'Action' },
];
adminsettings(){
  this.router.navigateByUrl('admin-approval');
}
}
















