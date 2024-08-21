
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicerequestService } from 'src/app/service/servicerequest/servicerequest.service';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';
import { TranslationServiceTsService } from 'src/app/service/translation-service/translation.service.ts.service';
import { TranslateService } from '@ngx-translate/core';
import { ExpertService } from 'src/app/service/expert-service/expert.service';

@Component({
  selector: 'app-quotation-edit-module',
  templateUrl: './quotation-edit-module.component.html',
  styleUrls: ['./quotation-edit-module.component.css']
})


export class QuotationEditModuleComponent implements OnInit {
    servForm: FormGroup;
    request_id: any;
    quote_id: any;
    request_details: any;
    package_details: any;
    services: any
    quote_items: any = [];
    key_word: any = 'servpack_name';
    totalprice: any;
    r_quotes: any;
    search = '';
    rows: any;
    accordians1: any = 1;
    expense_list: any;
    charge_type = 0;
    modal_open = 0;
    expense_id=0;
    items: any = [];
    selectedFile = null;
    selectedCurrency = 'USD - US Dollar';
    tax = 0;
    discount = 0;
    shippingCharge = 0;
    paymentMethod = 'bank';
    subtotal = 0.00;
    charges = 0.00;
    grandtotal = 0.00;
    charges_text = ''
    newpack_data: any;
    checkflag=0;
    advancecost:any;
    loading=0;
    exp_load=1;
    custom_i_cost=0.00;
    cols:any;
    wk_price: any;
    exp_percnt: any;
    constructor(private router: Router,
      private fb: FormBuilder,
      private activerouter: ActivatedRoute,
      private set_serv: SettingsService,
      private usr_ser: UserService,
      private exp_usr:ExpertService,
      private translationService: TranslationServiceTsService,
      private translate: TranslateService) {
        this.loading=1;
      this.servForm = this.fb.group({
        servpack_name: ['', [Validators.required]],
        servpack_cost: ['', [Validators.required]],
        servpack_desc: 'Custom Service',
        servpack_active_flag: true,
  
      });
      this.request_id = this.activerouter.snapshot.paramMap.get('id')!;
      this.quote_id = (this.activerouter.snapshot.paramMap.get('qid')!);
        this.exp_usr.getExpServ_det({'request_id':this.request_id}).subscribe((rdata: any) => {
          if (rdata.ret_data == 'success') {
            this.request_details = rdata.result;
            this.exp_percnt=this.request_details['cstm_vendor_percent'];
          
            this.services = rdata.services;
            this.calculateTotal(this.services)
          }
        });
      
      this.loading=0;
    }


  
    ngOnInit() {
  
      this.translate.get([
        'Quote Number',
        'Rejected Reason',
        'Updated On',
        'Additional Charges',
        'Additional Charge Cost',
        'Total Updated cost',
        'Action'
      ]).subscribe(translations => {
        this.cols = [
          { field: 'serm_number', title:translations ['Service Request Code'] },
  
          { field: 'qtm_number', title:translations ['Quote Number'] },
          { field: 'qtm_rejected_reason', title: translations['Rejected Reason'] },
          { field: 'qtm_updated_on', title: translations['Updated On'] },
          { field: 'qtm_ad_charge', title: translations['Additional Charges'] },
          { field: 'qtm_ad_charge_cost', title: translations['Additional Charge Cost'] },
          { field: 'qtm_cost', title: translations['Total Updated cost'] },
          { field: 'action', title: translations['Action'] },
        ];
      });
      this.set_serv.fetch_expense().subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.expense_list = rdata.exp_data;
  
        } else {
          let no_data_msg = rdata.Message;
        }
      });
    }



  
    expense_header()
    {
  
  
  
      if(this.charges_text){
        this.exp_load=1
      }else{
        this.exp_load=0
      }
      //console.log(" this.charges_text--------------->", this.charges_text);
     //console.log(" this.exp_load--------------->", this.exp_load);
     
    }
  
    recent_quotes() {
      let inputData = {
        serm_id: this.request_details.serm_id
      };
      this.usr_ser.recent_quotes(inputData).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.r_quotes = rdata.Quote_Data;
          this.rows = this.r_quotes
        } else {
          this.showMessage('', 'error');
        }
      });
    }
    selected_expense(event: any) {
  
  
      this.charges=0.00;
      this.charge_type=0;
      this.charges_text=''
  
      if(event.target.value==-1){
        this.expense_id = event.target.value;
      }else{
        this.expense_id = event.target.value;
        for (let i = 0; i < this.expense_list.length; i++) {
          if (this.expense_list[i]['exp_id'] == this.expense_id) {
            this.charges = parseFloat(this.expense_list[i]['exp_cost']);
            this.charge_type = 1
            this.charges_text = this.expense_list[i]['exp_name'];
            break;
          }
        }
      }
  
      if(this.charges_text){
        this.exp_load=1
      }else{
        this.exp_load=0
      }
      
      
  
    }
  
  
    created_expense() {
  
      if(this.expense_id==-1){
      
        this.charge_type = 2
      }else{
        this.charge_type = 1
        
      }
      
      this.calculate_tax();
      if(this.charges_text){
        this.exp_load=1
      }else{
        this.exp_load=0
      }
  
      //console.log("this.exp_load=1------------->",this.exp_load=1);
      
    }
   
  
  
  
    calculate_tax() {
  
      this.grandtotal = this.subtotal + this.charges;
      if (this.charge_type == 0) {
        this.charge_type = 2
      }
      this.advancecostfn(this.grandtotal);
  
    }
  
  
    addItem() {
  
      this.quote_items.push({
        servpack_id: '0',
        servpack_name: '',
        servpack_cost: 0.00,
      });
    }
  
    removeItem(index:any) {
      // this.quote_items = this.quote_items.filter((d: any) => d.id != item);
      this.quote_items.splice(index,1);
      this.calculateTotal(this.quote_items);
    }
  
    sendquote() {
  
  
      this.loading=1;
  
      let inputData = {
        serm_custid: this.request_details.serm_custid,
        serm_vehid: this.request_details.serm_vehid,
        serm_id: this.request_details.serm_id,
        totalcost: this.grandtotal,
        quote_items: this.services,
        v_cost: this.request_details['qtm_cost'],
        cstm_vendor_percent: this.exp_percnt,
        vm_id: this.request_details['vm_id']
      };
  
      this.exp_usr.v_quote_approval(inputData).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
  
          this.showMessage('Quote sent successfully', 'success');
          this.loading=0;
          setTimeout(() => {
          this.servlist();
          }, 500);
        } else {
          this.showMessage('', 'error');
        }
      });
    }
  
    showMessage(msg = '', type = '') 
    
    {
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
  
    
    onClearevent(index: any) {
      this.quote_items[index]['servpack_cost'] = 0;
      this.quote_items[index]['servpack_id'] = null;
      this.totalprice = this.calculateTotal(this.quote_items);
    }

    
  
      
  
    calculateTotal(quote_items: []) {

    
        
        
      this.subtotal = 0.00;
      if (quote_items.length > 0) {
        quote_items.forEach(element => {
          this.subtotal = this.subtotal + parseFloat(element['qti_cost']);
        });
        this.wk_price=((this.subtotal*this.exp_percnt/100));
      
        this.grandtotal = this.wk_price+this.charges+this.subtotal;
        //console.log("Grand Total----------------->",this.grandtotal);
        
      }
      if (this.services.length == 0) {
        this.grandtotal = 0;
      }
     this.advancecostfn(this.grandtotal);
  
    }
  
    servlist() {
      this.router.navigateByUrl('/service-request-list');
    }
    servq_details() {
      this.router.navigateByUrl('service-request-details/' + this.request_id);
    }
  
    servcreate() {
  
      this.usr_ser.serv_pack_create(this.servForm.value).subscribe((rdata: any) => {
        if (rdata.ret_data === "success") {
          this.package_details.push(
            {
              "servpack_id": rdata.servpack_id.toString(),
            "servpack_name": rdata.servpack_det.servpack_name,
            "servpack_cost": rdata.servpack_det.servpack_cost,
            "servpack_active_flag": "1",
          })
          
  
          this.quote_items.push({
            servpack_id: (rdata.servpack_id).toString(),
            servpack_name: rdata.servpack_det.servpack_name,
            servpack_cost: rdata.servpack_det.servpack_cost,
          });
          this.calculateTotal(this.quote_items);
          
         
  
        }
        else {
          this.showMessage(rdata.Message, 'error');
        }
      });
    }
  
    advancecostfn(total:any){
  
      
      
      this.advancecost=0.00;
      this.advancecost=parseFloat(this.advancecost).toFixed(2);
      
  
    }
  
    adv(){
      this.checkflag=1
      if(this.advancecost>this.grandtotal){
        this.advancecost=this.grandtotal
      }
  
      if(this.advancecost<0){
        this.advancecost=0.00;
      }
    }
  
  }