import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from 'src/app/service/customer/customer.service';
import {UserService} from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';
import { slideDownUp } from 'src/app/shared/animations';

@Component({selector: 'app-customer-edit-page',
 templateUrl: './customer-edit-page.component.html',
  styleUrls: ['./customer-edit-page.component.css'],

  animations: [slideDownUp],})
export class CustomerEditPageComponent {
    customerForm : FormGroup;
    imageurl : any = "assets/images/sample.jpeg";
    cust_data = {
        customername: '',
        customerphone: '',
        alternatenumber: '',
        customer_email: '',
        customeraddress: '',
        custtype: ''
    };
    cust_details : any;
    cust_id : string;
    rows = [];
    filteredRows = [];
    searchvalue : any;
    cust_types : any;
    loading = true;
    cstr_name : any;
    cstr_id =-1;
    accordians1:any = 1;
    percent=0;
    v_flag=false;
    constructor(private fb : FormBuilder,
         private customerService : CustomerService, 
         private router : Router, 
         private activerouter : ActivatedRoute,
         private usr_ser:UserService
         ) {
        this.cust_id = this.activerouter.snapshot.paramMap.get('id')!;
        this.customerForm = this.fb.group({
            customerid: [''],
            customername: [''],
            customerphone: [''],
            alternatenumber: [''],
            customer_email: [''],
            customeraddress: [''],
            custtype: [''],
            custm_gstin: [''],
            cstm_vendor_percent:[''],
            cstm_vendor_flag:['']

        });

        this.customerService.getcustomer_types().subscribe((rdata : any) => {
          if (rdata.ret_data == 'success') {
              this.cust_types = rdata.cust_types;


          } else {}
      });
    }
    ngOnInit() {
       
        this.customerService.getcustomerbyId(this.cust_id).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {

                setTimeout(() => {
                    this.cust_details = rdata.data
                    this.select_type()
                    this.customerForm.patchValue({
                        customerid: rdata.data.cstm_id,
                        customername: rdata.data.cstm_name,
                        customerphone: rdata.data.cstm_phone,
                        alternatenumber: rdata.data.cstm_alternate_num,
                        customer_email: rdata.data.cstm_email,
                        customeraddress: rdata.data.cstm_address,
                        custtype: rdata.data.cstr_id,
                        custm_gstin: rdata.data.cstm_gstin,
                        cstm_vendor_percent:rdata.data.cstm_vendor_percent,
                        cstm_vendor_flag:rdata.data.cstm_vendor_flag
                    });
                    this.percent=rdata.data.cstm_vendor_percent
                    this.v_flag=rdata.data.cstm_vendor_flag=="0"?false:true;
                    this.rows = rdata.sales_data;
                    this.filteredRows = this.rows;
                     // Example value, set this accordingly

                    // Get the checkbox element
                    
                    
                    this.loading = false;
                }, 1300);


            } else {

                setTimeout(() => {
                    this.loading = false;
                }, 1300);

            }

        });
    }
    
    update_v_flag(){
        this.usr_ser.vendor_Assign_update({'cstm_id':this.customerForm.value['customerid'],'cstm_vendor_flag':this.v_flag?1:0, 'cstm_vendor_percent': this.percent}).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
              this.showMessage('Updated!!', 'success');
              
               
            }else{
        
            }
          });

    }
    
    // update_c_percent(id:any,cash:any){

    //     this.percent=id==0?0:cash
    //     this.customerForm.patchValue({
    //         cstm_vendor_percent: this.percent
    //     });console.table("logggggggggggggggggggggggg",this.customerForm.value);

    //     const data={
    //        'cstm_vendor_percent': this.customerForm.value['cstm_vendor_percent'],
    //        'cstm_vendor_flag':this.customerForm.value['cstm_vendor_percent'],
    //        'cstm_id':this.customerForm.value['customerid']
    //     }
        
    //     this.usr_ser.vendor_Assign_update(data).subscribe((rdata: any) => {
    //         if (rdata.ret_data == 'success') {
    //           this.showMessage('Updated!!', 'success');
              
               
    //         }else{
        
    //         }
    //       });
        


    // }

    select_type() {
        for (let i = 0; i < this.cust_types.length; i++) {
            if (this.cust_types[i]['cstr_id'] == this.cust_details['cstm_cstr_id']) {
                this.cstr_name = this.cust_types[i]['cstr_name'];
                this.cstr_id = this.cust_types[i]['cstr_id'];
            }
            
        }
    }
  
    customerupdate() {
        this.customerService.cust_update(this.customerForm.value).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('Customer Updated.', 'success');
                setTimeout(() => this.router.navigate(['customer-list']), 500);
            }
        });
    }

    showMessage(msg = '', type = '') {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: {
                container: 'toast'
            }
        });
        toast.fire({icon: type, title: msg, padding: '10px 20px'});
    }

    onFileChanged() {}
    cols = [

        {
            field: 'csh_invnumber',
            title: 'Invoice Number'
        },
        {
            field: 'csh_invdate',
            title: 'Invoice Date'
        },
        {
            field: 'csh_productname',
            title: 'Item Name'
        },
        {
            field: 'csh_productcode',
            title: 'Product Code'
        }, {
            field: 'Action',
            title: 'Action'
        },
    ];

    onSearch(searchValue : string) {
        this.filteredRows = this.rows.filter(row => { // Convert each row's values to lowercase for case-insensitive search
            return Object.values(row).some(val => (val ? val.toString().toLowerCase().includes(searchValue.toLowerCase()) : false));
        });
    }
}
