import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.css']
})
export class UserEditPageComponent {



  UserForm: FormGroup;
  imageurl: any = "assets/images/sample.jpeg";
  usid: any;
  userroledata: any;
  key_word: any = 'role_name';
  selectedusertype:any;
  constructor(
    private router:Router,
    private fb: FormBuilder,
    public usr_ser:UserService,
    private activerouter: ActivatedRoute,
    private set_serv:SettingsService
    
  ) {

    this.set_serv.fetch_user_role().subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        this.userroledata = rdata.UserRoles;;
        
      }
    });
    const encodedRoleId = this.activerouter.snapshot.paramMap.get('id')!;
    this.usid = atob(encodedRoleId);

    this.UserForm = this.fb.group({
      password: ['', [Validators.required]],
      mobilenumber:['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('.+@.+\..+')]],
      userrole:['', [Validators.required]],
      dateofjoining:['', [Validators.required]],
      username:['', [Validators.required]],
      
    });
  }

  userupdate() {
    let userdata =
    {'user_data':this.UserForm.value,
     'us_id':this.usid
    }
    
    
  this.usr_ser.update_user(userdata).subscribe((rdata: any) => {
    if (rdata.ret_data === "success") {
      this.showMessage('User Updated.', 'success');
        setTimeout(() => this.router.navigate(['/user-list']), 500);
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
  

ngOnInit() {
  
     let data=btoa(this.usid);

  this.usr_ser.fetch_us_det(data).subscribe((rdata: any) => {
    if (rdata.ret_data == 'success') {
      this.UserForm.setValue({
        password:'',
        mobilenumber: rdata.us_details.us_phone,
        email: rdata.us_details.us_email,
        userrole: rdata.us_details.us_role_id,
        dateofjoining: rdata.us_details.us_date_of_joining,
        username: rdata.us_details.us_firstname,

      });

  
    }
});
}
user_list(){
  this.router.navigateByUrl('user-list');
}

  onFileChanged() {
  }

}
