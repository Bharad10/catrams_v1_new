import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-service-edit-module',
  templateUrl: './service-edit-module.component.html',
  styleUrls: ['./service-edit-module.component.css']
})
export class ServiceEditModuleComponent {
  srid: string;
  servform: FormGroup;
  serv_details: any;
  toollist: any;
  toolcheckflag = 0;
  toolname = 'Select a Tool'
  toolid = -1
  toolarray: any = [];

  constructor(
    private fb: FormBuilder,
    private usr_ser: UserService,
    private router: Router,
    private activerouter: ActivatedRoute,
  ) {
    const encodedRoleId = this.activerouter.snapshot.paramMap.get('id')!;
    this.srid = atob(encodedRoleId);
    this.servform = this.fb.group({
      servpack_name: '',
      servpack_cost: 0.00,
      servpack_desc: '',
      servpack_active_flag: '',
      serv_id: this.srid,
      tools: []
    });

    this.usr_ser.fetch_service_pack(encodedRoleId).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.serv_details = rdata.Service_Request_details;
        this.toollist = rdata.tool_data;
        if (this.serv_details.tools == 0) {
          this.toolcheckflag = 0;
        } else {
          this.toolcheckflag = 1;
          this.toolarray = this.serv_details.tools;
        }
        this.servform.patchValue({
          servpack_name: this.serv_details.servpack_name,
          servpack_cost: this.serv_details.servpack_cost,
          servpack_desc: this.serv_details.servpack_desc,
          servpack_active_flag: this.serv_details.servpack_active_flag,
          tools: this.serv_details.tools,
        });
      }
    });
  }

  adminsettings() {
    this.router.navigateByUrl('admin-approval');
  }

  readytoollist(value: any) {
    if (value == 0) {
      this.toolcheckflag = 1;
    } else {
      this.toolcheckflag = 0;
      this.toolarray = [];
      this.toolid = -1;
    }
  }
  tool_name(value: any) {
    let count = 0;
    let j = this.toolarray.length;
    for (let k = 0; k < this.toolarray.length; k++) {
      if (value === this.toolarray[k]['tool_id']) {
        count = count + 1;
      }
    }
    if (count == 0) {
      for (let i = 0; i < this.toollist.length; i++) {
        if (value == this.toollist[i]['tool_id']) {
          this.toolarray[j] = this.toollist[i];
        }
      }
    } else {
      this.showMessage("Tool Already added", 'error');
    }
  }

  delete_tool(id: any) {
    this.toolarray.splice(id, 1);
  }

  servupdate() {
    this.servform.patchValue({
      tools: this.toolarray,
    });
    this.usr_ser.update_serv_details(this.servform.value).subscribe((rdata: any) => {
      if (rdata.ret_data === "success") {
        this.showMessage("Updated Successfully!!", 'success');
        setTimeout(() => this.servlist(), 500);
      }
      else {
        this.showMessage("Error!!!", 'error');
      }
    });
  }

  servlist() {
    this.router.navigateByUrl('service-package-list');
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
