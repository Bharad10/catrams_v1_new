import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css']
})
export class UserListPageComponent implements OnInit {
  userlist: any;
  rows = [];
  access_data: any;
  userfeatures:any;
  permittedaction:any;
  permission_Denied=0;
  loading=true;
search='';
cols:any=[]
  constructor(private router: Router, private usr_ser: UserService, private translate: TranslateService,) {
    this.access_data = localStorage.getItem("access_data");
    this. cols = [
      { field: 'us_firstname', title: 'User Name' },
      { field: 'us_role_id', title: 'User Role' },
      { field: 'last_login', title: 'Last Active Status' },
      { field: 'Action', title: 'Action' },
    ];
    this.translate.get([
      'User Name',
      'User Role',
      'Last Active Status',
      'Action'
    ]).subscribe(translations => {
      this.cols = [
   
        { field: 'us_firstname', title:translations ['User Name']  },
        { field: 'us_role_id', title: translations ['User Role'] },
        { field: 'last_login', title: translations ['Last Active Status'] },
        { field: 'Action', title: translations ['Action'] },
      ];
    });
    
  }

  ngOnInit() {
    this.userfeatures=JSON.parse(atob(atob(this.access_data)));
    this.userfeatures.forEach((element: any) => {element['ft_id']==7?this.permittedaction=element['actions']:"";});

    if(this.permittedaction.includes('5')){
    this.usr_ser.fetch_user().subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        setTimeout(() => {
          this.userlist=rdata.user_list
          this.rows=this.userlist;
          this.loading=false;
        }, 1300);
        
      }
      else{
        setTimeout(() => {
          this.loading=false;
          this.showMessage("Error Fetching Data!!.Please Try Again", 'error');
        }, 1300);
       
      }
    });}else{
      this.permission_Denied=1;
    }
    
   }
   user_list(){
    window.location.reload();
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
 

  
 edituser(usid:any) {
  if(this.permittedaction.includes('2')){
    this.router.navigateByUrl('user-edit/' + (btoa(usid)));
  }else{
    this.permission_Denied=1;
    this.showMessage("Permission Denied!!!!",'error')
  }

 }
 createuser(){

  if(this.permittedaction.includes('1')){
    this.router.navigateByUrl('user-create');
  }else{
    this.permission_Denied=1;
    this.showMessage("Permission Denied!!!!",'error')
  }
 }
 deleteuser(data:any){
  if(this.permittedaction.includes('3')){
    this.router.navigateByUrl('user-create');
  }else{
    this.permission_Denied=1;
    this.showMessage("Permission Denied!!!!",'error')
  }
 }
 
 }
