import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-create-page',
  templateUrl: './customer-create-page.component.html',
  styleUrls: ['./customer-create-page.component.css']
})
export class CustomerCreatePageComponent {

  CustomerForm: FormGroup;
  imageurl: any = "assets/images/sample.jpeg";
  constructor(
    private router:Router,
    private fb: FormBuilder,
    public usr_ser:UserService,
    private customerService:CustomerService
    
  ) {
    this.CustomerForm = this.fb.group({
      customername:['', [Validators.required]],
      customerphone:['', [Validators.required]],
      alternatenumber:'',
      email:'',
      customeraddress:'',
      custtype:'1',
      gstin:''
  

    });
  }

  customercreate() {
    // let custdata =
    // {'custdata':this.CustomerForm.value}
  this.customerService.cust_create(this.CustomerForm.value).subscribe((rdata: any) => {
    if (rdata.ret_data === "success") {
      this.showMessage('Customer Created.', 'success');
        setTimeout(() => this.router.navigate(['customer-list']), 500);
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
