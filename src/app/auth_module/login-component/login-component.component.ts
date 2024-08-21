
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { AuthLayout } from 'src/app/layouts/auth-layout';
import Swal from 'sweetalert2';
import { OneSignal } from 'onesignal-ngx';


@Component({
  moduleId: module.id,
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  animations: [
    trigger('toggleAnimation', [
      transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
      transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
  ],
})
export class LoginComponentComponent implements OnInit {

  loginForm: FormGroup;
  store: any;
  currYear: number = new Date().getFullYear();

  fcm_token: any = localStorage.getItem("onesignal_id");

  userdata: any;
  accesdata: any;
  toastrService: any;
  position: any;
  button_act_state=0;
  isSubmitForm1=false;
  languages=[{'id':1,'name':'English','code':'en'},{'id':2,'name':'Arabic','code':'ae'}];
  isPasswordVisible = false;


  constructor(public translate: TranslateService,
    public storeData: Store<any>,
    public router: Router,
    private auth_ser: AuthServiceService,
    private appSetting: AppService,
    private fb: FormBuilder,
    // private oneSignal: OneSignal
    ) {

      
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email, Validators.pattern('.+@.+\..+')]],
      password: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(30)]],
      fcm: this.fcm_token
    });
  }

  async ngOnInit() {

  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  logintodash() {

    
    this.isSubmitForm1=true;

    if (this.loginForm.valid) {
      this.button_act_state=1;

      const userData = this.loginForm.value;
      this.auth_ser.user_login(userData).subscribe((rdata: any) => {
        if (rdata.ret_data === "success") {
          if (rdata.verify === "true") {
            this.userdata = rdata.user_details;
            
            

            localStorage.setItem("us_token", this.userdata.us_token);
            localStorage.setItem("us_id", btoa(btoa(this.userdata.us_id)));
            localStorage.setItem("us_firstname", btoa(btoa(this.userdata.us_firstname)));
            localStorage.setItem("us_email", btoa(btoa(this.userdata.us_email)));
            localStorage.setItem("us_role_id", btoa(btoa(this.userdata.us_role_id)));
            localStorage.setItem("us_phone", btoa(btoa(this.userdata.us_phone)));
            localStorage.setItem("us_date_of_joining", btoa(btoa(this.userdata.us_date_of_joining)));

            

            let temp_array: { ft_id: any; actions?: any; }[] = [];

            rdata.access.forEach((element: { ft_id: any; }) => {
              let retflag = false;

              if (temp_array.length > 0) {
                temp_array.forEach((tempele: { ft_id: any; }) => {
                  if (tempele.ft_id == element.ft_id) {
                    retflag = true;
                    return;
                  }
                });

                if (!retflag) {
                  let temdata: any[] = [];

                  rdata.access.forEach((element2: { ft_id: any; fa_id: any; }) => {
                    if (element2.ft_id == element.ft_id) {
                      temdata.push(element2.fa_id);
                    }
                  });

                  let tempdata = {
                    ft_id: element.ft_id,
                    actions: temdata
                  };

                  temp_array.push(tempdata);
                }
              } else {
                let temdata: any[] = [];

                rdata.access.forEach((element2: { ft_id: any; fa_id: any; }) => {
                  if (element2.ft_id == element.ft_id) {
                    temdata.push(element2.fa_id);
                  }
                });

                let tempdata = {
                  ft_id: element.ft_id,
                  actions: temdata
                };

                temp_array.push(tempdata);
              }
            });
            localStorage.setItem("access_data", btoa(btoa(JSON.stringify(temp_array))));
            this.showToast(1);
            setTimeout(() => this.router.navigate(['/dashboard']), 500);
          }

          else {
            this.accesdata = rdata.access;
            this.showToast(0);
            this.button_act_state=0
          }
        } else {
          this.showToast(0);
          this.button_act_state=0
        }
      });
    }
  }

  private showToast(data: number) {
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
    if (data === 1) {
     
    } else {
      toast.fire({
        icon: 'error',
        title: 'Credentials Mismatch!! Try again',
        padding: '10px 20px',
      });
    }
  }
  changeLanguage(item: any) {
    
    if (item.id == 2) {
        localStorage.setItem('rtlClass', 'rtl');
        localStorage.setItem('i18n_locale', 'ae'); 
    }else{
        localStorage.setItem('rtlClass', 'ltr');
        localStorage.setItem('i18n_locale', 'en');
    }
    window.location.reload()
    
}




}
