import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-history-details',
  templateUrl: './service-history-details.component.html',
  styleUrls: ['./service-history-details.component.css']
})

export class ServiceHistoryDetailsComponent {
  sdetails: any;
  request_list: any;
  request_details: any;
  package_details: any;
  services: any;
  medias: any;
  subtotal=0;
  date:any;
  loader:boolean=true;

constructor(private fb: FormBuilder,
  private usr_ser:UserService,
  private router:Router,
  private activerouter: ActivatedRoute,
  private datePipe: DatePipe) {
      const encodedRoleId = this.activerouter.snapshot.paramMap.get('id')!;
  this.sdetails = encodedRoleId;
  //console.log('tool id---->', this.sdetails );
  let data={
      'serm_id':this.sdetails,
      'flagid':1
  }
  this.usr_ser.fetch_service_details(this.sdetails).subscribe((rdata: any) => {
    if (rdata.ret_data == 'success') {
      this.request_details = rdata.result;
      this.package_details=rdata.Packages;
      this.services=rdata.services;
      this.medias=rdata.medias;
      this.date = this.datePipe.transform(this.request_details.serm_updatedon, 'dd-MMM-yyyy hh:mm a');

      this.calculate_subtotal();
      this.loader=false;
    }
  });
  }

  calculate_subtotal(){
this.subtotal=this.request_details.serm_cost-this.request_details.serm_ad_charge_cost
  }
  
columns = [
    {
        key: 'id',
        label: 'S.NO',
    },
    {
        key: 'title',
        label: 'ITEMS',
    },
    
    {
        key: 'price',
        label: 'PRICE',
        class: 'ltr:text-right rtl:text-left',
    },
    {
        key: 'amount',
        label: 'AMOUNT',
        class: 'ltr:text-right rtl:text-left',
    },
];

print = () => {
    window.print();
};
servhist(){
  this.router.navigateByUrl('service-request-history')
}
servlist(){
  this.router.navigateByUrl('service-request-list');
}
servdet() {
let id=this.sdetails;
  this.router.navigateByUrl('work-card-create/' + this.sdetails );
 }
}
