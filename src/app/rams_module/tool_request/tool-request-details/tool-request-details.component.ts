import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tool-request-details',
  templateUrl: './tool-request-details.component.html',
  styleUrls: ['./tool-request-details.component.css']
})


export class ToolRequestDetailsComponent {
    tdetails: any;
    request_list: any;
  
  constructor(private fb: FormBuilder,
    private usr_ser:UserService,
    private router:Router,
    private activerouter: ActivatedRoute,) {
        const encodedRoleId = this.activerouter.snapshot.paramMap.get('id')!;
    this.tdetails = atob(encodedRoleId);

    
    this.usr_ser.tool_req_details(encodedRoleId).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
           this.request_list=rdata.req_list;
        }else{
          let no_data_msg=rdata.Message;
        }
    });
    }
    
  items = [
      {
          id: 1,
          title: 'launch-x431',
         
          price: '6000',
          amount: '6000',
      },
     
  ];
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
          key: 'quantity',
          label: 'QTY',
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
  toolhistlist(){
    this.router.navigateByUrl('tool-request-history');
  }
  toolrequestlist(){
    this.router.navigateByUrl('tool-request-list');

  }
  tooledit() {
let id=this.tdetails;
    this.router.navigateByUrl('tool-request-edit/' + (btoa(id)));
   }
}
