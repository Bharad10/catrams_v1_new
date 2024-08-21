import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SettingsService } from 'src/app/service/settings-service/settings.service';


@Component({
  selector: 'app-customer-settings-create',
  templateUrl: './customer-settings-create.component.html',
  styleUrls: ['./customer-settings-create.component.css']
})

export class CustomerSettingsCreateComponent {
  discountform: FormGroup;
  cd_type=0;

  constructor(
    private router:Router,
    private fb: FormBuilder,
    public set_ser:SettingsService,
    
    
  ){
    this.discountform = this.fb.group({
      cd_type:['0', [Validators.required]],
      cd_rate:['',[Validators.required]],
      cd_request_type:['', [Validators.required]],
    });
  }
  discountTypeChanged(event:any){
    this.cd_type=event.target.value;

    this.discountform.patchValue({
      cd_type: event.target.value
  });
  }
  requestTypeChanged(event:any){

    
    this.discountform.patchValue({
      cd_request_type: event.target.value
  });
  
  }
  adminsettings(){
    this.router.navigateByUrl('admin-approval');
  }
  custsettings(){
    this.router.navigateByUrl('customer-settings');
  }
  insert_disc(){

this.set_ser.create_pm(this.discountform.value).subscribe((rdata: any) => {
  if (rdata.ret_data == "success") {
    this.showMessage('Discounted Created.', 'success');
      setTimeout(() => this.router.navigate(['customer-settings']), 500);
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
}
