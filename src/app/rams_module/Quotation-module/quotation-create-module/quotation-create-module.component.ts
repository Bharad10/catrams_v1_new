import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicerequestService } from 'src/app/service/servicerequest/servicerequest.service';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';
import { TranslationServiceTsService } from 'src/app/service/translation-service/translation.service.ts.service';
import { TranslateService } from '@ngx-translate/core';
import { slideDownUp } from 'src/app/shared/animations';

@Component({
  selector: 'app-quotation-create-module',
  templateUrl: './quotation-create-module.component.html',
  styleUrls: ['./quotation-create-module.component.css'],
  animations:[slideDownUp]
})
export class QuotationCreateModuleComponent implements OnInit {
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
  subtotal:any = 0.00;
  charges :any= 0.00;
  grandtotal:any = 0.00;
  charges_text = ''
  newpack_data: any;
  checkflag=0;
  advancecost:any;
  loading=0;
  addChargeFlag:boolean=false;
  custom_i_cost=0.00;
  cols:any;
  accordians3:any = 0;
  tab1 :any;
  hometab:any;
  recentquote:any
  recentSubtotal: any;
  constructor(private router: Router,
    private fb: FormBuilder,
    private activerouter: ActivatedRoute,
    private set_serv: SettingsService,
    private usr_ser: UserService,
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
    if (!(this.quote_id == 'null')) {



      this.usr_ser.get_quotedetails(btoa(this.quote_id)).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.request_details = rdata.result;
          this.package_details = rdata.Packages;
          this.services = rdata.services;
          this.get_previousq(rdata.services)
          this.recent_quotes();
        }
      });

    } else {
      this.quote_id=null

      this.usr_ser.fetch_service_details(this.request_id).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.request_details = rdata.result;
          this.package_details = rdata.Packages;
         
          this.services = rdata.services;
        }
      });
    }

    

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

  get_previousq(rdata:any){
    this.quote_items = rdata.map((service: { qti_cost: any; servpack_id: any; servpack_name: any; }) => ({
      servpack_cost: service.qti_cost,
      servpack_id: service.servpack_id,
      servpack_name: service.servpack_name
    }));

    this.charges=this.request_details.qtm_ad_charge_cost
    this.charges_text=this.request_details.qtm_ad_charge
    this.grandtotal=this.request_details.qtm_cost
    this.subtotal = this.grandtotal - this.charges;
    this.charge_type = this.request_details.qtm_ad_type
    
    
  }


  expense_header()
  {
    this.charges=this.charges!=null?this.charges:0.00
    
    this.addChargeFlag=(this.charges_text&&this.charges!=-1)||(!this.charges_text&&this.charges==0)?false:true;
   
  }

  recent_quotes() {
    let inputData = {
      serm_id: this.request_details.serm_id
    };
    this.usr_ser.recent_quotes(inputData).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.r_quotes = rdata.Quote_Data;
        this.rows = this.r_quotes
        this.selectedQuote(this.r_quotes[0]);
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
          this.charges = parseFloat(this.expense_list[i]['exp_cost']).toFixed(2);
          this.charge_type = 1
          this.charges_text = this.expense_list[i]['exp_name'];
          break;
        }
      }
    }
    this.charges=this.charges!=0?this.charges:0.00
    this.addChargeFlag=(this.charges_text&&this.charges!=-1)||(!this.charges_text&&this.charges==0)?false:true;
    
    

  }


  created_expense() {

    if(this.expense_id==-1){
    
      this.charge_type = 2
    }else{
      this.charge_type = 1
      
    }
    
    this.calculate_tax();
    this.charges=this.charges!=0?this.charges:0.00
    this.charges=parseFloat(this.charges).toFixed(2);
    this.addChargeFlag=(this.charges_text&&this.charges!=-1)||(!this.charges_text&&this.charges==0)?false:true;
    
  }
 



  calculate_tax() {

    this.grandtotal = parseFloat(this.subtotal) + parseFloat(this.charges);
    this.grandtotal=parseFloat(this.grandtotal).toFixed(2)
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
      quote_items: this.quote_items,
      qtm_ad_type: this.charge_type,
      qtm_ad_charge: this.charges_text,
      qtm_ad_charge_cost: this.charges,
      serm_pay_amount:this.advancecost,
      serm_pay_alert:this.checkflag
    };

    this.usr_ser.save_quote(inputData).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {

        this.showMessage('Quote sent successfully', 'success');
        this.servlist();
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

  selectEvent($event: any, index: any) {


    this.quote_items[index]['servpack_cost'] = $event.servpack_cost;
    this.quote_items[index]['servpack_id'] = $event.servpack_id;
    this.quote_items[index]['servpack_name'] = $event.servpack_name;
    this.calculateTotal(this.quote_items);
//console.log("----test-2--->",this.quote_items);

  }
  onClearevent(index: any) {
    this.quote_items[index]['servpack_cost'] = 0;
    this.quote_items[index]['servpack_id'] = null;
    this.totalprice = this.calculateTotal(this.quote_items);
  }

  custom_total($event: any, index: any)
  {
    //console.log("$event.value---------------->",$event.target.value);
    
    this.quote_items[index]['servpack_cost'] = $event;
    this.calculateTotal(this.quote_items);
  }


  calculateTotal(quote_items: []) {

    this.subtotal = 0.00;
    if (quote_items.length > 0) {
      quote_items.forEach(element  => {
        this.subtotal = parseFloat(this.subtotal) + parseFloat(element['servpack_cost']);
      });
      this.subtotal=parseFloat(this.subtotal).toFixed(2)
     
      
      this.grandtotal = this.subtotal +parseFloat(this.charges) ;
      this.grandtotal=parseFloat(this.grandtotal).toFixed(2)
    }
    if (this.quote_items.length == 0) {
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


  custom_confirm_modal()
  {

    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      padding: '2em',
      customClass: 'sweet-alerts',
  }).then((result) => {
      if (result.value) {
        this.sendquote()
          
      }
  });
  }

  check_valid(){
    const isItemLengthValid= this.quote_items.length===0?true:false;
    const itemsValid = this.quote_items.some((item: { servpack_id: string; servpack_cost: string; }) => 
    Number(item.servpack_id) === 0 || Number(item.servpack_cost) === 0
);
 
    const chargesValid= this.addChargeFlag
    let result = isItemLengthValid||itemsValid||chargesValid ===true?true:false;
    return result;

  }

    validPendingQuote(){
     return this.request_details.serm_status==21?true:false;
    }

    selectedQuote(recentquote:any){
     this.tab1=recentquote.qtm_number
     this.recentquote=recentquote
     this.recentSubtotal=(recentquote.qtm_cost - recentquote.qtm_ad_charge_cost)
     
    }

}

