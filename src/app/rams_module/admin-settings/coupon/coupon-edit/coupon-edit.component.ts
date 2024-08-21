import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon-edit',
  templateUrl: './coupon-edit.component.html',
  styleUrls: ['./coupon-edit.component.css']
})
export class CouponEditComponent {
  CouponForm: FormGroup;
  selectedCouponType: string = '';
  coup_id: string;
  cust_list: any;
  key_word:any='cstm_name';
  cstm_id: any;
  coupon_data: any;
  loading=1;
  nodetails=0;
  cstm_name: any;
  custed_list:any=[]
  constructor(
    private router:Router,
    private fb: FormBuilder,
    public usr_ser:UserService,
    private activerouter: ActivatedRoute,
    
  ) {
    this.usr_ser.fetch_cust_list().subscribe((rdata: any) => {
      if (rdata.ret_data === "success") {
        this.cust_list=rdata.cust_list
      } 
      else{
        this.showMessage(rdata.Message, 'error');
      }
    });

    this.CouponForm = this.fb.group({
      coupon_code:['', [Validators.required]],
      coupon_description:'',
      coupon_valid_from:['', [Validators.required]],
      coupon_valid_to:['', [Validators.required]],
      coupon_total_usage:['', [Validators.required]],
      coupon_max_discount:['', [Validators.required]],
      coupon_min_amount:['', [Validators.required]],
      coupon_discount_type:['', [Validators.required]],
      coupon_discount:['', [Validators.required]],
      coupon_type:['cstm_specific', [Validators.required]],
      cstm_id:'',
      coupon_id:['cstm_specific', [Validators.required]],
      coupon_type_id:['', [Validators.required]],
      cust_list:[]
      

    })
    this.coup_id = this.activerouter.snapshot.paramMap.get('id')!;
    this.usr_ser.coupoun_details(this.coup_id).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.coupon_data=rdata.coupon_data;
        this.CouponForm.patchValue({
          coupon_code:rdata.coupon_data.coupon_code,
          coupon_description:rdata.coupon_data.coupon_description,
          coupon_valid_from:rdata.coupon_data.coupon_valid_from,
          coupon_valid_to:rdata.coupon_data.coupon_valid_to,
          coupon_total_usage:rdata.coupon_data.coupon_total_usage,
          coupon_max_discount:rdata.coupon_data.coupon_max_discount,
          coupon_min_amount:rdata.coupon_data.coupon_min_amount,
          coupon_discount_type:rdata.coupon_data.coupon_discount_type,
          coupon_discount:rdata.coupon_data.coupon_discount,
          coupon_type:rdata.coupon_data.coupon_type_id,
          coupon_id:rdata.coupon_data.coupon_id,
          coupon_type_id:rdata.coupon_data.coupon_type_id,
          cust_list:rdata.coupon_data.cust_list
          
        });
        
        this.coup_det();
        
      }else{
        this.showMessage(rdata.Message, 'error');
        this.loading=0;
        this.nodetails=1;
      }


    });
   
    
  }
  coup_det()
{
  

  if(this.coupon_data.coupon_type_id==1){
    this.selectedCouponType='cstm_specific'
    this.custed_list=this.CouponForm.value['cust_list'];
  }
if((this.coupon_data.cust_list.length)>0){
this.cstm_name=this.coupon_data.cust_list[0]['cstm_name'];

let event={
  cstm_id:this.coupon_data.cust_list[0]['sc_item_id']
}
this.selectEvent(event,0)
}
this.loading=0;

} 
  ngOnInit() {
  }

  onFileChanged() {
  }
  couponTypeChanged(event: any) {
    this.selectedCouponType = event.target.value;
  if(this.selectedCouponType=='fest_specific'){
    this.CouponForm.patchValue({
      coupon_type: 0
  });
  }else{
    this.CouponForm.patchValue({
      coupon_type: 1
  });
  }
  }
  selectEvent(event:any,index:any){
   
  
    this.cstm_id=event.cstm_id;
  
    this.CouponForm.patchValue({
      cstm_id: event.cstm_id,
     
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

update_coup(){

this.usr_ser.coupoun_update(this.CouponForm.value).subscribe((rdata: any) => {
  if (rdata.ret_data === "success") {
    this.showMessage('Coupoun Updated.', 'success');
      setTimeout(() => this.router.navigate(['coupon-list']), 500);
  } 
  else{
    this.showMessage(rdata.Message, 'error');
  }
});

}

}
