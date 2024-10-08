import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl,ValidatorFn  } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';
import { slideDownUp } from 'src/app/shared/animations';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-customer-create-page',
  templateUrl: './customer-create-page.component.html',
  styleUrls: ['./customer-create-page.component.css'],
  animations:[slideDownUp]
})
export class CustomerCreatePageComponent implements OnInit {

  CustomerForm: FormGroup;
  imageurl: any = "assets/images/sample.jpeg";
  accordians1:any=1
  cust_types: any;

  percent=0;
  v_flag=false;
  loading=true;
  isSubmitForm1=false;
  us_phone_code=environment.us_phone_code
  constructor(
    private router:Router,
    private fb: FormBuilder,
    public usr_ser:UserService,
    private customerService:CustomerService,
    
  ) {
    

    
    this.CustomerForm = this.fb.group({
      customername:['', [Validators.required,Validators.maxLength(25),Validators.minLength(1)]],
      customerphone: ['', [Validators.required, this.phoneNumberValidator()]],
      alternatenumber: ['', [this.phoneNumberValidator()]],
      email:['', [ Validators.maxLength(100), Validators.email, Validators.pattern('.+@.+\..+')]],
      customeraddress:['', [Validators.maxLength(60)]],
      custtype: ['', [Validators.required]],
      gstin:['', [Validators.maxLength(15)]]

    });
    this.customerService.getcustomer_types().subscribe((rdata : any) => {
      if (rdata.ret_data == 'success') {
          this.cust_types = rdata.cust_types;
          this.loading=false
      } else {}
  });
  
  }
  phoneNumberValidator(): ValidatorFn {
    
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = /^\d{10}$/.test(control.value);
      return isValid ? null : { 'invalidPhoneNumber': { value: control.value } };
    }
  }

  customercreate() {
  this.isSubmitForm1=true;
  
  
   if(this.CustomerForm.valid){
    this.loading=true;
    this.customerService.cust_create(this.CustomerForm.value).subscribe((rdata: any) => {
      if (rdata.ret_data === "success") {
        this.showMessage('Customer Created.', 'success');
        this.router.navigate(['customer-list'])
      } 
      else{
        this.showMessage(rdata.Message, 'error');
      }
    });
   }
 
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

  setcusttype(typeId:any){ this.CustomerForm.patchValue({custtype:typeId})}

}
