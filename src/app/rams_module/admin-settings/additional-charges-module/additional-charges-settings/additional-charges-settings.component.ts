import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-additional-charges-settings',
  templateUrl: './additional-charges-settings.component.html',
  styleUrls: ['./additional-charges-settings.component.css']
})
export class AdditionalChargesSettingsComponent {
  
  pay_array: any;
  filteredRows: any;
  rows:any;
  searchvalue : any;
loading=true;
search=''
  constructor(private usr_ser: UserService, private set_serv:SettingsService,
              private router:Router) {
                this.set_serv.fetch_expense().subscribe((rdata: any) => {
                  if (rdata.ret_data === "success") {
                    setTimeout(() => {
                      this.rows=rdata.exp_data
                      this.loading=false;
                    }, 1300);
             
                  } 
                  else{
                    setTimeout(() => {
                      this.loading=false;
                    }, 1300);
             
                  }
                });

  }
  cols = [
    { field: 'exp_name', title: 'Expense' },
    { field: 'exp_desc', title: 'Description' },
    { field: 'exp_cost', title: 'Cost' },
    { field: 'exp_created_on', title: 'Created on' },
    { field: 'Action', title: 'Action' },

  ];
 
  delete_expense(id:any){
  
    this.set_serv.expense_delete({'exp_id':id}).subscribe((rdata: any) => {
      if (rdata.ret_data === "success") {
       
        
      } 
      else{
        
 
      }
    });

  }
  adminsettings(){
    this.router.navigateByUrl('admin-approval');
  }
  createexpense(){
this.router.navigateByUrl('expense-create');
  }
  showMessage(msg = '', type = 'success') {
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
show_cust_alert(id:any)
{
  
  // Swal.fire({
  //     icon: 'warning',
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     showCancelButton: true,
  //     confirmButtonText: 'Delete',
  //     padding: '2em',
  //     customClass: 'sweet-alerts',
  // }).then((result) => {
  //     if (result.value) {
  //         this.delete_expense(id)
  //         this.showMessage("Deleted!!",'success')
  //     }
  // });
}
  
}
