import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { UserService } from 'src/app/service/user-service/user.service';
import { environment } from 'src/environments/environment';
import { TranslationServiceTsService } from 'src/app/service/translation-service/translation.service.ts.service';
import { TranslateService } from '@ngx-translate/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-service-request-create',
  templateUrl: './service-request-create.component.html',
  styleUrls: ['./service-request-create.component.css']
})


export class ServiceRequestCreateComponent implements OnInit {
  
  servform: FormGroup;
  serv_pack_list:any=[];
  date:any;
  cust_list: any;
  cust_details: any=[];
  make_list: any;
  model_list: any;
  varient_list: any;
  custveh_flag=-1;
  cust_veh: any=[];
  make_veh: any;
  model_veh: any;
  varaint_veh: any;
  index: any;
  custveh_regnumber: any;
  custveh_vinnumber: any;
  cust_vehicle_id=-1;
  us_id: any;
  role_id: any;
  baseurl=environment.base_img_url;
  usritems: any=[];
  user_list: any;
  asignee_id='-1';
  selectCustomerText:any;
  loading:boolean=true;
  veh_loader:boolean=false;
  custom_veh_loader: boolean=false;
  create_service_flag : boolean=true;
  buttonClicked: boolean=false;
  @ViewChild('assignemodal')assignemodal:any;

  constructor(private router: Router,
    private usr_ser: UserService,
     private activerouter: ActivatedRoute,
    private _lightbox: Lightbox,
       private _lightboxConfig: LightboxConfig,
       private datePipe: DatePipe,
       private fb: FormBuilder,
       private cust_serv:CustomerService,
       private translationService: TranslationServiceTsService,
       private translate: TranslateService
       
       ){
        this.role_id = localStorage.getItem("us_role_id");
        this.role_id=atob(atob(this.role_id));
        this.us_id = localStorage.getItem("us_id");
        this.us_id=atob(atob(this.us_id));
         this.date = new Date();
         this.servform = this.fb.group({
          serm_custid: ['', [Validators.required]],
          serm_vehid:['', [Validators.required]],
          serm_complaint: ['',[Validators.required]],
          serm_number:['', [Validators.required]],
          serm_assigne:['', [Validators.required]],
          serm_vendor_flag:[0, [Validators.required]],
          custveh_regnumber:['', [Validators.required]],
          custveh_vinnumber: ['', [Validators.required]],
        });
       } 
  ngOnInit(): void {
    this.translate.get('Select Customer').subscribe((translation: string) => {
      this.selectCustomerText = translation;
    });
    this.usr_ser.fetch_cust_list().subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.cust_list = rdata.cust_list
      }

    });
    this.usr_ser.vehicle_make_list().subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.make_list = rdata.veh_make
        this.servform.patchValue({
          serm_number:rdata.request_id,
        });
      }

    });
    this.usr_ser.fetch_user().subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.user_list = rdata.user_list

      

      }

    });

    setTimeout(() => {
      this.loading=false;
    }, 1200);
    

  }

  
     
  add_new_Veh(id:any){
 

    
    if(id==0){
      this.custveh_vinnumber='';
      this.custveh_regnumber='';
      this.custveh_flag=1;
      
    }else{
      this.custveh_flag=0;
    }
  
   
  }

  servlist() {
    this.router.navigateByUrl('service-request-list');
  }

  selected_cust(event:any){
    
    console.log("event----------------------------------------------->",event);
    
    
    this.veh_loader=true
    this.cust_details=[];
    let data=btoa(event)
    this.cust_serv.getcustomerbyId(data).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.cust_details = rdata.data
        this.cust_veh=rdata.cust_veh
        if((this.cust_veh.length==0)){
          this.add_new_Veh(0);
        }else{
          this.add_new_Veh(1);
          this.select_veh(0,3);
        }
    this.servform.patchValue({
      serm_custid:this.cust_details.cstm_id
    });
    this.veh_loader=false;
      }

    });

  }
  select_veh(index:any,flag:any){    
    if(flag==1){
      let i=index+1;
      this.make_veh=this.cust_veh[i]['make_name'];
      this.model_veh=this.cust_veh[i]['model_name'];
      this.varaint_veh=this.cust_veh[i]['variant_name'];
      this.custveh_regnumber=this.cust_veh[i]['custveh_regnumber'];
      this.custveh_vinnumber=this.cust_veh[i]['custveh_vinnumber'];
      this.cust_vehicle_id=this.cust_veh[i]['custveh_veh_id'];

      this.index=i;
    }else if(flag==2){
      let i=index-1;
      this.make_veh=this.cust_veh[i]['make_name'];
      this.model_veh=this.cust_veh[i]['model_name'];
      this.varaint_veh=this.cust_veh[i]['variant_name'];
      this.custveh_regnumber=this.cust_veh[i]['custveh_regnumber'];
      this.custveh_vinnumber=this.cust_veh[i]['custveh_vinnumber'];
      this.cust_vehicle_id=this.cust_veh[i]['custveh_veh_id'];
      this.index=i;
    }else{
      let i=index;
      this.make_veh=this.cust_veh[i]['make_name'];
      this.model_veh=this.cust_veh[i]['model_name'];
      this.varaint_veh=this.cust_veh[i]['variant_name'];
      this.custveh_regnumber=this.cust_veh[i]['custveh_regnumber'];
      this.custveh_vinnumber=this.cust_veh[i]['custveh_vinnumber'];
      this.cust_vehicle_id=this.cust_veh[i]['custveh_veh_id'];

      this.index=i;
    }
  
   this.openbox(this.cust_veh[this.index]['datacards']) 
  }
  opendatacard(index: number): void {
      

    
    this._lightbox.open(this.usritems, index);
}
  proceed_veh(){
   
      this.servform.patchValue({
        serm_vehid:this.cust_vehicle_id,
        custveh_regnumber  :this.custveh_regnumber,
        custveh_vinnumber:this.custveh_vinnumber
      });
      this.custveh_flag=2;
   
  }
  retrieve_models(event:any){

    
    
    // this.veh_loader=true;
  
    let  value={
      'make_name':event
    }

    this.usr_ser.vehicle_model_list(value).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.model_list = rdata.veh_model
        this.make_veh=event
      }
      // setTimeout(() => {
      //   this.veh_loader=false;
        
      // },800 );

    });
   
  }
  retrieve_varients(event:any){
    // this.veh_loader=true;
    let value={
      'model_name':event
    }
    this.usr_ser.vehicle_varient_list(value).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.varient_list = rdata.veh_varients
        this.model_veh=event
      }

    });
    // setTimeout(() => {
    //   this.veh_loader=false;
      
    // },800 );
  }

  selected_Veh(event:any){
    this.cust_vehicle_id=event;
    for(let i=0;i<this.varient_list.length;i++){
      if(event==this.varient_list[i]['id']){
        this.varaint_veh=this.varient_list[i]['variant_name']
      }
    }
    
  }

  create_service(){

    this.buttonClicked = true;
    this.create_service_flag = false;
    if(this.buttonClicked){
      this.usr_ser.create_serm_req(this.servform.value).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
      this.create_service_flag = true;
      this.buttonClicked = false;
          
       this.sendquote(rdata.request_id)
        }else{
          this.create_service_flag = true;
          this.buttonClicked = false;
        }
      });
    }
    
   

    
    
  }

  sendquote(id:any) {
    
    this.router.navigateByUrl('/service-request-details/' + btoa(id));

  }
  openbox(datacardimages:any) {

    this._lightboxConfig.showImageNumberLabel = true;
    this._lightboxConfig.showZoom = true;
    this._lightboxConfig.showRotate = true;
    this._lightboxConfig.showDownloadButton = true;
    this._lightboxConfig.fitImageInViewPort = true;
    this._lightboxConfig.albumLabel = '%1 of %2';
    for (let i = 0; i <datacardimages.length; i++) {
      
      const r_images =datacardimages[i];
      const srcValue = this.baseurl+r_images.cvehcard_url;
      const caption='image'+'_'+i;
      const title='smedia_id'+'_'+i;
      
      this.usritems.push({
        src: srcValue,
        caption:caption,
        title:title
        
      });
    
   
    } 
  
  }

  selectEvent(event:any,type:any){
    if(type==0){
      this.servform.patchValue({
        serm_assigne:event.target.value,
      });
      this.asignee_id=event.target.value
    }else{
      this.servform.patchValue({
        serm_assigne:this.us_id,
      });
      this.asignee_id=this.us_id

      this.create_service()
    }

    

}

openAssigneModal(){
  if(this.servform.value['custveh_regnumber'] == '' || this.servform.value['custveh_regnumber'] == null ||
    this.servform.value['custveh_vinnumber'] == '' || this.servform.value['custveh_vinnumber'] == null
  ){
    this.showMessage('Please select Vehicle', 'warning');
  }else{
    this.assignemodal.open()
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

}
