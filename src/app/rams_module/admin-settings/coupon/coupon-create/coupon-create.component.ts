import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-coupon-create',
  templateUrl: './coupon-create.component.html',
  styleUrls: ['./coupon-create.component.css']
})
export class CouponCreateComponent implements OnInit {

  CouponForm: FormGroup;
  selectedCouponType: string = 'cstm_specific';
  cust_list: any;
  key_word:any='cstm_name';
  selectedCustomer: string='';
  cstm_id: any;
  percent_flag=0;
  coupon_min_amount=0;
  selected_cust=[];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  custarray: any = [];
  selectCustomerText:any
custid: any;
isSubmitForm1=false;
button_act_state:boolean=false
  constructor(
    private router:Router,
    private fb: FormBuilder,
    public usr_ser:UserService,
    private translate: TranslateService
    
  ) {
    this.translate.get('Select Customer').subscribe((translation: string) => {
      this.selectCustomerText = translation;
    });
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'cstm_name',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.CouponForm = this.fb.group({
      coupon_code:['', [Validators.required]],
      coupon_description:['', [Validators.required]],
      coupon_valid_from:['', [Validators.required]],
      coupon_valid_to:['', [Validators.required]],
      coupon_total_usage:['', [Validators.required]],
      coupon_max_discount:['', [Validators.required]],
      coupon_min_amount:['', [Validators.required]],
      coupon_discount_type:['', [Validators.required]],
      coupon_discount:['', [Validators.required]],
      coupon_type:['cstm_specific', [Validators.required]],
      cstm_id:'-1',
      cust_list:[]


    });
    this.usr_ser.fetch_cust_list().subscribe((rdata: any) => {
      if (rdata.ret_data === "success") {
        this.cust_list=rdata.cust_list
      } 
      else{
        this.showMessage(rdata.Message, 'error');
      }
    });
    
  }
 
  ngOnInit() {
    
  }
  onItemSelect(item: any) {
  }

  onSelectAll(items: any) {
  }
  onFileChanged() {
  }

  insert_coup(){
    
    this.isSubmitForm1=true;

    let coupoundata =this.CouponForm.value
    this.CouponForm.patchValue({ cust_list: this.custarray })
    
    
    if(this.CouponForm.valid){
      this.button_act_state=true
      this.usr_ser.coupoun_create(this.CouponForm.value).subscribe((rdata: any) => {
        if (rdata.ret_data === "success") {
          this.showMessage('Coupoun Created.', 'success');
            setTimeout(() => this.router.navigate(['coupon-list']), 500);
        } 
        else{
          this.showMessage(rdata.Message, 'error');
        }
      });
    }else{

    }
    this.button_act_state=false
 
    
    
   

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
selectEvent($event:any,index:any){

  this.cstm_id=$event.cstm_id;

  this.CouponForm.patchValue({
    cstm_id: $event.cstm_id
});


}

discount_type_change(event:any){
  
  if(event.target.value==1){
    this.percent_flag=1
  }else{
    this.percent_flag=0
  }

}
fest_specific() {
  this.selectedCouponType = 'fest_specific';
  this.CouponForm.patchValue({
      coupon_type: '0'
  });
}

cust_specific() {
  this.selectedCouponType = 'cstm_specific';
  this.CouponForm.patchValue({
      coupon_type: '1'
  });
}
couponTypeChanged(event: any) {
  this.selectedCouponType = event.target.value;

if(this.selectedCouponType=='fest_specific'){

  this.CouponForm.patchValue({
    coupon_type: 0
});
this.custarray=[];
}else{

  this.CouponForm.patchValue({
    coupon_type: 1
});
}
  

}
adminsettings(){
  this.router.navigateByUrl('admin-approval');
}
readytoollist(event: any) {

  let value=event.target.value;
  if (value == 'fest_specific') {
    this.custarray = [];
    this.custid = -1;
  } 

}
cust_details(value: any) {


  let count = 0;
  let j = this.custarray.length;
  for (let k = 0; k < this.custarray.length; k++) {
    if (value === this.custarray[k]['cstm_id']) {
      count = count + 1;
    }
  }
  if (count == 0) {
    for (let i = 0; i < this.cust_list.length; i++) {
      if (value == this.cust_list[i]['cstm_id']) {
        this.custarray[j] = this.cust_list[i];
      }
    }
  } else {
    this.showMessage("Customer Already added", 'error');
  }


}
delete_tool(id: any) {

  this.custarray.splice(id, 1);

}


}

