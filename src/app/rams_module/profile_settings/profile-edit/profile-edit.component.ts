import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingsService} from 'src/app/service/settings-service/settings.service';
import {SystemService} from 'src/app/service/system/system.service';
import {UserService} from 'src/app/service/user-service/user.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {NumberInput} from '@angular/cdk/coercion';
import { environment } from 'src/environments/environment';
import { ModalComponent } from 'angular-custom-modal';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.css'],
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [
                style(
                    {opacity: 0, transform: 'scale(0.95)'}
                ),
                animate('100ms ease-out', style({opacity: 1, transform: 'scale(1)'}))
            ]),
            transition(':leave', [animate('75ms', style({opacity: 0, transform: 'scale(0.95)'}))]),
        ]),
    ]
})


export class ProfileEditComponent implements OnInit {
  @ViewChild('resetPasswordModal ') resetPasswordModal!: ModalComponent;

    activeTab = 'home';
    us_id : any;
    loading : boolean 
    role_id : any 
    role_name : any 
    imageurl : any = "assets/images/sample.jpeg";
    base_img_url=environment.base_img_url;
    current_password=''
    new_password=''
    password_check_flag=0;
    pass_loader=0;

    userform : FormGroup;
    userroledata : any;
    constructor(private router : Router,
       private fb : FormBuilder, 
       public usr_ser : UserService, 
       private activerouter : ActivatedRoute, public syt_serv : SystemService, public set_serv : SettingsService) {
        this.loading = true
        this.set_serv.fetch_user_role().subscribe((rdata : any) => {
            if (rdata.ret_data == "success") {
                this.userroledata = rdata.UserRoles;;
            }
        });

        this.userform = this.fb.group({
            password: [
                '',
                [Validators.required]
            ],
            mobilenumber: [
                '',
                [Validators.required]
            ],
            email: [
                '',
                [
                    Validators.required, Validators.pattern('.+@.+\..+')
                ]
            ],
            userrole: [
                '',
                [Validators.required]
            ],
            dateofjoining: [
                '',
                [Validators.required]
            ],
            username: [
                '',
                [Validators.required]
            ]

        });

        this.us_id = this.activerouter.snapshot.paramMap.get('id')!;
        this.usr_ser.fetch_us_det(this.us_id).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.userform.setValue({
                    password: '',
                    mobilenumber: rdata.us_details.us_phone,
                    email: rdata.us_details.us_email,
                    userrole: rdata.us_details.us_role_id,
                    dateofjoining: rdata.us_details.us_date_of_joining,
                    username: rdata.us_details.us_firstname

                });
                console.table(this.userform.value);
                
                this.loading = false;
                this.define_usr_roles(rdata.us_details.us_role_id, 0);
            } else {
                this.loading = false;
            }
        });


    }

    define_usr_roles(id : any, type : NumberInput) {

        let state = 0;


        if (type == 0) {

            for (let i = 0; i < this.userroledata.length; i++) {
                if (id === this.userroledata[i]['role_Id']) {
                    this.role_name = this.userroledata[i]['role_name']
                    state = 1
                } else {
                    state = 0
                }
            }
            if (state == 1) {
                this.userform.patchValue({userrole: id})
            }
        } else {
            for (let i = 0; i < this.userroledata.length; i++) {
                if (id.target.value === this.userroledata[i]['role_Id']) {
                    this.role_name = this.userroledata[i]['role_name']
                    state = 1
                } else {
                    state = 0
                }
            }
            if (state == 1) {
                this.userform.patchValue({userrole: id.target.value})
            }

        }



    }

    edit_profile() {
      

      let data={
        'user_data':this.userform.value,
        'us_id':atob(this.us_id)
      }

      //console.log("data--------------->",data);
      


        this.usr_ser.update_user(data).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
              this.showMessage('Updated.', 'success');
              this.router.navigateByUrl('profile-view')
            }
        });
    }

    ngOnInit() {}

    profile() {

        this.router.navigateByUrl('profile-view')
    }

    password_change()
    
    {
      this.pass_loader=1;

      const data={
        'password':this.current_password
      }

      this.syt_serv.check_password(data).subscribe((rdata : any) => {
        if (rdata.ret_data == 'success') {

          const verify= rdata.data;

          if( verify==0)
          {
            this.password_check_flag=1;
            this.resetPasswordModal.close();
          }else{
            
            this.password_check_flag=2;
            this.pass_loader=0;
          }


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
