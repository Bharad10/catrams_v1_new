import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent {
  coup_list: any;
  rows = [];
  cols:any=[];
  loading=true;
search='';
  constructor(private router: Router,private usr_ser:UserService,private translate: TranslateService,) {

    this.cols = [
      { field: 'coupon_code', title: 'Coupon Code' },
      { field: 'coupon_description', title: 'Coupon Description' },
      { field: 'Action', title: 'Action' },
    ];
    this.translate.get([
      'Coupon Code',
      'Coupon Description',
      'Action'
    ]).subscribe(translations => {
      this.cols = [
   
        { field: 'coupon_code', title:translations ['Coupon Code']  },
        { field: 'coupon_description', title: translations ['Coupon Description'] },
        { field: 'Action', title: translations ['Action'] },
      ];
    });

    this.usr_ser.coupoun_list().subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        setTimeout(() => {
          
        this.coup_list = rdata.coupon_list;
        this.rows=this.coup_list;
        this.loading=false;
        }, 1300);

      }else{
        setTimeout(() => {
          this.loading=false;
          }, 1300);
      }
    });
   }
   adminsettings(){
    this.router.navigateByUrl('admin-approval');
  }

  ngOnInit() {
  }
  createcoupoun(){
    this.router.navigateByUrl('coupon-create');
  }

  editcoupon( id:any) {
    this.router.navigateByUrl('coupon-edit/' + (btoa(id)));
  }
  deletecoupoun(id:any){
    let data={
      'coupon_id':id
    }
    this.usr_ser.delete_coupon(data).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.showMessage('Coupoun Deleted.', 'success');
        window.location.reload();
      }else{
        this.showMessage('Error!!Please Try Again Later.', 'error');
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


