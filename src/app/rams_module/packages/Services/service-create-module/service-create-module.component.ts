import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user-service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({ selector: 'app-service-create-module', templateUrl: './service-create-module.component.html', styleUrls: ['./service-create-module.component.css'] })
export class ServiceCreateModuleComponent {
  
  servform: FormGroup;
  serv_details: any;
  toollist: any;
  toolcheckflag = 0;
  toolname = 'Select a Tool';
  toolid = -1;
  toolarray: any = [];
  isSubmitForm1 = false;
  button_act_state = 0
  image_load_state = 0

  constructor(private router: Router, private fb: FormBuilder, public usr_ser: UserService,) {
    this.usr_ser.tool_list().subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        this.toollist = rdata.tool_list;
      } else {
      }
    });
    this.servform = this.fb.group
      ({
        servpack_desc: ['', [Validators.required]],
        servpack_cost: ['', [Validators.required]],
        servpack_name: ['', [Validators.required]],
        tools: []
      });
  }

  adminsettings() {
    this.router.navigateByUrl('admin-approval');
  }

  servcreate() {
    this.isSubmitForm1 = true;
    this.button_act_state = 1
    this.servform.patchValue({ tools: this.toolarray })
    if (this.servform.valid) {
      this.button_act_state = 1
      this.usr_ser.serv_pack_create(this.servform.value).subscribe((rdata: any) => {
        if (rdata.ret_data === "success") {
          this.showMessage('Service Created Successfuly!!.', 'success');
          setTimeout(() => this.router.navigate(['/service-package-list']), 500);
        } else {
          this.showMessage(rdata.Message, 'error');
          this.button_act_state = 0
        }
      });
    } else {
      this.button_act_state = 0
    }
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
      customClass: {
        container: 'toast'
      }
    });
    toast.fire({ icon: type, title: msg, padding: '10px 20px' });
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
}
