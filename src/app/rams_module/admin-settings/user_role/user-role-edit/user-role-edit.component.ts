import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from 'src/app/service/settings-service/settings.service';


@Component({
    selector: 'app-user-role-edit',
    templateUrl: './user-role-edit.component.html',
    styleUrls: ['./user-role-edit.component.css']
})


export class UserRoleEditComponent implements OnInit {
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
    usid: any;
    data_list: any;
    role_id: any;
  tempfeaturedata:any=[];
  userdata: any;
    


    constructor(private fb: FormBuilder,private router: Router,private set_serv:SettingsService,    private activerouter: ActivatedRoute,) {
        const encodedRoleId = this.activerouter.snapshot.paramMap.get('id')!;
       
      if(!localStorage.getItem("us_token")){
        this.router.navigateByUrl('user_auth/user');
      } 
      this.userForm = this.fb.group({
     
        rname:['',[Validators.required]],
        rdesc:['',[Validators.maxLength(80)]],
        roleid:0,
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
          
      this.set_serv.fetch_role_data(encodedRoleId).subscribe((rdata: any) => {
         if(rdata.ret_data=="success"){
          this.loading = false;
          this.userdata=rdata.userrole
         this.userForm.patchValue({
           roleid:rdata.userrole.role_id,
           rname:rdata.userrole.role_name,
           rdesc:rdata.userrole.role_description,
         });

        rdata.feature.forEach((element: { ft_id: any; ft_name: any; }) => {
            if(this.tempfeaturedata.length>0){
              let retflag=false;
              this.tempfeaturedata.forEach((tempele: { ft_id: any; }) => {
                if(tempele.ft_id==element.ft_id){
                  retflag=true;
                  return;
                }
              });
              if(!retflag){
                let temdata: any[]=[]
                rdata.feature.forEach((element2: { ft_id: any; fa_id: any; }) => {
                  if(element2.ft_id==element.ft_id){
                    temdata.push(element2.fa_id);
                  }
                });
                let tempdata={
                  ft_id:element.ft_id,
                  ft_name:element.ft_name,
                  actions:temdata
                }
                this.tempfeaturedata.push(tempdata);
              }
            }else{
              let temdata: any[]=[]
              rdata.feature.forEach((element2: { ft_id: any; fa_id: any; }) => {
                if(element2.ft_id==element.ft_id){
                  temdata.push(element2.fa_id);
                }
              });
              let tempdata={
                ft_id:element.ft_id,
                ft_name:element.ft_name,
                actions:temdata
              }
              this.tempfeaturedata.push(tempdata);
            }
            
          });
          this.featuredata.forEach(item=>{
            this.tempfeaturedata.forEach((item2: { ft_id: any; actions: string | string[]; })=>{
              if(item2.ft_id==item.featureId){
                if(item2.actions.includes("1")){
                  
                  item.add=true;
                }
                if(item2.actions.includes("2")){
                  
                  item.update=true;
                }
                if(item2.actions.includes("3")){
                  
                  item.delete=true;
                }
                if(item2.actions.includes("4")){
                  
                  item.view=true;
                }
                if(item2.actions.includes("5")){
                  
                  item.list=true;
                }
              }
            });
          });
        }
      });
        // });
        }else{
         
        }
      });
   
     }
   
    ngOnInit(): void {
      this.loading = false
    }
   
    updateuserole(){
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
        "roleid":this.userForm.value.roleid,
        "rname": this.userForm.value.rname,
        "groupid":this.userForm.value.ug_groupid,
        "rdesc": this.userForm.value.rdesc,
        "features":sendfeatures
      }
   
      if(sendfeatures.length >0){
   
        let _that=this;
      this.set_serv.user_role_update(senddata).subscribe((rdata: any) => {
   
        if(rdata.ret_data=="success"){
          this.showMessage("success", "User Role Created Successfully");
          _that.router.navigateByUrl('user-role-settings');
        }else{
          this.loading = false;
          this.showMessage("danger", "Some error occurred please try again");
        }
      });
   
    }else{
      this.loading = false;
      this.showMessage("danger", "Please select atleast one Feature Action");
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