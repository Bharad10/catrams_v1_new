import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/service/settings-service/settings.service';


@Component({
    selector: 'app-user-role-add',
    templateUrl: './user-role-add.component.html',
    styleUrls: ['./user-role-add.component.css']
  })



export class UserRoleAddComponent implements OnInit {
    e:any;
    loading = true;
      userForm:  FormGroup;
    actionList:any="";
   
   grouplist=[];
   featuredata: {
    featureId: any;
    feature_name: any;
    feature_desc: any;
    add: boolean;
    update: boolean;
    delete: boolean;
    view: boolean;
    list: boolean;
  }[] = [];


    constructor(private fb: FormBuilder,private router: Router,private set_serv:SettingsService) {
      if(!localStorage.getItem("us_token")){
        this.router.navigateByUrl('user_auth/user');
      } 
      this.userForm = this.fb.group({
     
        rname:['',[Validators.required]],
        rdesc:['',[Validators.maxLength(80)]],
        flag:false,
      });
      this.set_serv.fetch_feature().subscribe((rdata: any) => {
        if(rdata.ret_data=="success"){
           
            rdata.fe_list.forEach((element: { ft_id: any; ft_name: any; ft_description: any; }) => {
              let singleitem={
                "featureId":element.ft_id,
                "feature_name":element.ft_name,
                "feature_desc":element.ft_description,
                "add":false,
                "update":false,
                "delete":false,
                "view":false,
                "list":false
              };
              this.featuredata.push(singleitem);

            });
          }else{
         
          }
        });
     
   
     }
   
    ngOnInit(): void {
      this.loading = false
    }
   
    adminsettings(){
      this.router.navigateByUrl('admin-approval');
    }
   
    
    createuserole(){
        
      this.loading = true;
      let sendfeatures: { featureId: any; actions: string[]; }[]=[];
      
      this.featuredata.forEach(element => {
        let tmpary=[];
        this.userForm.value.flag=false;
        if(element.add){tmpary.push("1"); this.userForm.value.flag=true;};
        if(element.update){tmpary.push("2"); this.userForm.value.flag=true;};
        if(element.delete){tmpary.push("3");this.userForm.value.flag=true;};
        if(element.view){tmpary.push("4");this.userForm.value.flag=true;};
        if(element.list){tmpary.push("5"); this.userForm.value.flag=true;};
        if(this.userForm.value.flag){
        let tmpdata={
          "featureId":element.featureId,
          "actions":tmpary
        }
        sendfeatures.push(tmpdata)
      }
      });

      
      let senddata={
        "rname": this.userForm.value.rname,
        "rdesc": this.userForm.value.rdesc,
        "features":sendfeatures,
        "groupid":this.userForm.value.ug_groupid
      }
   
      if(sendfeatures.length >0){
   
        
      this.set_serv.user_role_add(senddata).subscribe((rdata: any) => {
   
        if(rdata.ret_data=="success"){
            this.showMessage('Role Created.', 'success');
            setTimeout(() => this.router.navigate(['/user-role-settings']), 500);
        }else{
            this.showMessage('Error!!Please Try Again.', 'error');
          
        }
      });
   
    }else{
      this.loading = false;
    }
    }
    navigateBack($event: any) {
     
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