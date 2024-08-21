import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-additional-charges-create',
  templateUrl: './additional-charges-create.component.html',
  styleUrls: ['./additional-charges-create.component.css']
})


export class AdditionalChargesCreateComponent {

  ExpenseForm: FormGroup;
  imageurl: any = "assets/images/sample.jpeg";
  constructor(
    private router:Router,
    private fb: FormBuilder,
    public usr_ser:UserService,
    private set_serv:SettingsService
    
  ) {
    this.ExpenseForm = this.fb.group({
      expensename:['', [Validators.required]],
      expenseamount:['', [Validators.required]],
      expensedescription:'',
  

    });
  }

  createexpense() {
    // let custdata =
    // {'custdata':this.ExpenseForm.value}
  this.set_serv.expense_add(this.ExpenseForm.value).subscribe((rdata: any) => {
    if (rdata.ret_data === "success") {
      this.showMessage('Expense Created.', 'success');
        setTimeout(() => this.router.navigate(['expense-settings']), 500);
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


}
