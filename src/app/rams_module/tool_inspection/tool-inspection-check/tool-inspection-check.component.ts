import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/service/user-service/user.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Lightbox,LightboxConfig } from 'ngx-lightbox';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-tool-inspection-check',
  templateUrl: './tool-inspection-check.component.html',
  styleUrls: ['./tool-inspection-check.component.css']
})
export class ToolInspectionCheckComponent {

  ToolInspectionForm: FormGroup;
  imageurl: any = "assets/images/tool1.jpeg";
  imageurldamage: any = "assets/images/sample.jpeg";
  showReturnDetails = false;
  request_list: any;
  trid: any;
  req: any;
  inspectiondamage: any;
  rejectreason:any;
  tr_id:any;
  details: any;
  price:any;
  due_cost: any;
  actual_price=0.00;  
  updated_deposit=0.00;
  damagedtoolimg: any=[];
  titems: any=[];
  baseurl=environment.base_img_url;

  constructor(
    private fb: FormBuilder,
    private usr_ser:UserService,
    private router:Router,
    private activerouter: ActivatedRoute,
    private _lightbox: Lightbox,
    private _lightboxConfig: LightboxConfig

  ) {
    this.ToolInspectionForm = this.fb.group({
      toolname:'',
      toolquantity:'',
      toolduration:'',
      tooldescription:'',
      custaddress:'',
      toolprice:'',
    });
    const encodedRoleId = this.activerouter.snapshot.paramMap.get('id')!;
    let id = atob(encodedRoleId);
    this.tr_id=id;
    let data=encodedRoleId;
    _lightboxConfig.enableTransition = false;
    _lightboxConfig.wrapAround = true;
    _lightboxConfig.positionFromTop = 0;
    _lightboxConfig.disableScrolling = true;
    
    this.usr_ser.tool_req_details(data).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          ////console.log("success");
          this.request_list=rdata.req_list;
           this.ToolInspectionForm.setValue({
            toolname: this.request_list.tool_name,
            toolquantity: this.request_list.tldt_tool_quant,
            toolduration: this.request_list.tldt_tool_duration,
            custaddress: this.request_list.tldt_delivery_address,
            tooldescription: this.request_list.tool_description,
            toolprice: this.request_list.tldt_cost,
          });
          
        }else{
          let no_data_msg=rdata.Message;
        }
    });
  }

  toolNoIssues() {
  }
  depositcost(){
    ////console.log("hai helo");
    this.actual_price=(this.request_list.tool_rent_cost)*(this.request_list.tldt_tool_duration)*(this.request_list.tldt_tool_quant);
    if(this.request_list.due_rent_price){
      this.updated_deposit=(this.request_list.refund_price-this.request_list.due_rent_price);
      ////console.log(" this.updated_deposit-------------->", this.updated_deposit);
      
      if(this.updated_deposit<=0){
        
        this.updated_deposit=0.00;

      }
    }
   
    
      }
  toolDamaged() {

    let data={
      trt_notes:this.rejectreason,
      trt_rq_id:this.tr_id,
      trt_type:2,
      trt_url:this.price
       }

this.usr_ser.inspection_reject(data).subscribe((rdata: any) => {
  if (rdata.ret_data == 'success') {
    ////console.log("success");
  //   setTimeout(function () {
    this.router.navigateByUrl('tool-inspection-list');
  // }, 1000);
  }else{
    let no_data_msg=rdata.Message;
  }
});

    
  }

  showMessage(msg = '', type = '') {
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



  toggleReturnDetails() {
    this.showReturnDetails = !this.showReturnDetails;
  }

  toggleReturnCancel(){
    this.showReturnDetails = !this.showReturnDetails;
  }

  Toolreachedstatus(id:any){
    let data={
      tr_id:id.tool_request_id,
      status_id:id.tool_req_status_id
    };
    this.usr_ser.status_master_controller(data).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        ////console.log("success");
        window.location.reload()

      }else{
        let no_data_msg=rdata.Message;
      }
  });
  
  }
  inspectioncompleted(id:any,type:any){

    if(type==0){
      let data={
        tr_id:this.request_list.tldet_id,
        status_id:this.request_list.tldt_status,

      };


      this.usr_ser.status_master_controller(data).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          
          setTimeout(() => {
            this.router.navigateByUrl('tool-inspection-list');
        }, 800);
        
        }else{
          let no_data_msg=rdata.Message;
        }
    });
    }
    else{
      
      let data={
        'tldet_id':this.request_list.tldet_id,
        'refund_price':this.request_list.refund_price,
         'rpt_id':this.request_list.rpt_id,
         'tldt_status':this.request_list.tool_req_status_id,
         'type':0
      };
      this.usr_ser.refund_calc(data).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          ////console.log("success");
          this.router.navigateByUrl('tool-request-list');
        }else{
          let no_data_msg=rdata.Message;
        }
    });
    }
    
  
  }

  toolinspectionreturn(id:any){
    ////console.log(id);
    
    let data={
      tr_id:id.tool_request_id,
      status_id:id.tool_req_status_id,
      flag_id:1
    };
    this.usr_ser.status_master_controller(data).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        ////console.log("success");
      //   setTimeout(function () {
        this.router.navigateByUrl('tool-inspection-list');
      // }, 1000);
      }else{
        let no_data_msg=rdata.Message;
      }
  });
  
  }

  toolinspection(){
    this.router.navigateByUrl('tool-inspection-list');
  }

  admin_approval(type:any){

    if(type==0){
      let data={
        'type':type,
        'tldet_id':this.request_list.tldet_id
      }
      this.usr_ser.damagedtool_insp(data).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.showMessage('Success','success')
        this.router.navigateByUrl('tool-inspection-list')
        }else{
          this.showMessage('Servor Error!!!','error')
        }
    });
    }else{
      let data={
        'type':type,
        'tldet_id':this.request_list.tldet_id,
        'rpt_amount':this.request_list.rpt_amount,
        'rpt_id':this.request_list.rpt_id,
         'due_cost':this.due_cost,
         'rejectreason':this.rejectreason
      }
      this.usr_ser.damagedtool_insp(data).subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.showMessage('Success','success')
        this.router.navigateByUrl('tool-inspection-list')
        }else{
          this.showMessage('Servor Error!!!','error')
        }
    });
    } 

  }
  onFileChanged(event: any) {
    const file = event.target.files[0];
  
   let _that = this;
   const reader = new FileReader();
   const inData = new FormData();
   inData.append('toolimage', file);
   reader.readAsDataURL(file);
   reader.onload = e => this.imageurl = reader.result;
  
   this.usr_ser.datacard_image_upload(inData).subscribe((rdata: any) => {
     if (rdata.ret_data == "success") {
       let j=this.damagedtoolimg.length;
       this.damagedtoolimg[j]=rdata.path;
       this.lightbox(rdata.path)
       
     }
   });
  }
  lightbox(path:any) {
    this._lightboxConfig.showImageNumberLabel = true;
    this._lightboxConfig.showZoom = true;
    this._lightboxConfig.showRotate = true;
    this._lightboxConfig.showDownloadButton = true;
    this._lightboxConfig.fitImageInViewPort = true;
    this._lightboxConfig.albumLabel = '%1 of %2';
        const r_images =path;
        const srcValue = this.baseurl+r_images;
        const caption='image'+'_';
        const title='_Image';    
        this.titems.push({
          src: srcValue,
          caption:caption,
          title:title
          
        });
  }
  opentool(index: number): void {
  
    this._lightbox.open(this.titems, index);
  
    }

    deleteimage(index: number) {
       
      this.titems.splice(index, 1); // Remove the item from the array
      this.damagedtoolimg.splice(index, 1); // Remove the item from the array
  
  }

}
