import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { DatepickerOptions } from 'ng2-datepicker';
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-user-create-page',
  templateUrl: './user-create-page.component.html',
  styleUrls: ['./user-create-page.component.css']
})
export class UserCreatePageComponent {


  UserForm: FormGroup;
  imageurl: any = "assets/images/sample.jpeg";
  userroledata: any;
  key_word: any = 'role_name';
  selectedusertype:any;
  maxDate: any;
  store:any
 
  constructor(
    private router:Router,
    private fb: FormBuilder,
    public usr_ser:UserService,
    private set_serv:SettingsService,
    public storeData: Store<any>,
    private datePipe: DatePipe
  ) {

    
    this.maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.set_serv.fetch_user_role().subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        this.userroledata = rdata.UserRoles;;
       
      }
    });
    this.UserForm = this.fb.group({
      password: ['', [Validators.required]],
      mobilenumber:['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('.+@.+\..+')]],
      userrole:['', [Validators.required]],
      dateofjoining:['', [Validators.required]],
      username:['', [Validators.required]],
    });


    
  }
  selectEvent($event:any,index:any){
   

    

// this.subtotal =this.subtotal+parseFloat($event.servpack_cost)

}

  usercreate() {
    let userdata =
    {'user_data':this.UserForm.value}
    
  this.usr_ser.create_user(userdata).subscribe((rdata: any) => {
    if (rdata.ret_data === "success") {
      this.showMessage('User Created.', 'success');
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
  }

  onFileChanged() {
  }
  user_list(){
    this.router.navigateByUrl('user-list');
  }

}