import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/service/user-service/user.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import {Lightbox, LightboxConfig} from 'ngx-lightbox';
import { slideDownUp } from 'src/app/shared/animations';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-tool-sale-details',
  templateUrl: './tool-sale-details.component.html',
  styleUrls: ['./tool-sale-details.component.css'],
  animations: [
    slideDownUp
],
})



export class ToolSaleDetailsComponent implements OnInit {
  ToolRequestForm: FormGroup;
  tdetails: any;
  request_list: any;
  items:any
  trid: any;
  history_list: any;
  return_data: any;
  base_img_url=environment.base_img_url;
  r_images: any;
  images: { path: string }[] = [];
  button_act_state=0
  total_cost: any;
  tool_det: any;
  pm_flag=0;
  track_id = '';
  track_url = '';
  track_reference = '';
  imageurl : any = "assets/images/sample.jpeg";
  toolimages : any = [];
  titems: any = [];
  accordians3:any = 2;
  nxtdata: any=[];
  usr_tool_images: any=[];
 
 
  trurl_valid:boolean=false;
  trid_valid:boolean=false;
  track_valid:boolean=false
  tr_images:boolean=false;


  constructor(
    private fb: FormBuilder,
    private usr_ser:UserService,
    private router:Router,
    private activerouter: ActivatedRoute,
    private _lightbox : Lightbox,
    private _lightboxConfig : LightboxConfig
  ) {
    this.ToolRequestForm = this.fb.group({
      toolname:'',
      availablequantity:'',
      quantity:'',
      price:'',
      tooldescription:'',
      rentdays:'',
      toolid: this.trid,
     
      
    });
    _lightboxConfig.enableTransition = false;
    _lightboxConfig.wrapAround = true;
    _lightboxConfig.positionFromTop = 0;
    _lightboxConfig.disableScrolling = true;

  
  }
  ngOnInit(){
    const encodedRoleId = this.activerouter.snapshot.paramMap.get('id')!;
    
      this.tdetails = atob(encodedRoleId);
      this.usr_ser.fetch_order_details(encodedRoleId).subscribe((rdata: any) => {
        if (rdata.ret_data === 'success') {
          setTimeout(() => {
            
            this.request_list = rdata.order_data;
            this.items=rdata.items;
            this.r_images=rdata.images;
            this.history_list=rdata.order_history;
            if(this.request_list.customer_dicounts.cd_request_type==3||this.request_list.customer_dicounts.cd_request_type==4){
              this.pm_flag=1;
            }
            this.usr_tool_images = this.request_list.Tracking_Media.User;
            if(this.request_list.shipment_details.shm_track_id){
              this.track_id=this.request_list.shipment_details.shm_track_id
            }
           
            
            if ((this.usr_tool_images.length) > 0) {
                this.usrFancybox()
            }
            this.total_cost=parseFloat(this.request_list.order_total_cost).toFixed(2)
            this.tool_det=this.items[0];

          }, 2500); 
        }else{
            let no_data_msg=rdata.Message;
          }
      });
      
      
  }

  checkTrackValid(type:number){

    if(type==1){
     this.trid_valid= this.track_id.trim().length > 0;
    }else if(type==2){
     this.trurl_valid=this.track_url.trim().length > 0;
    }else{
     
     this.tr_images=(this.toolimages.length)>0?true:false;
    }
 
    this.track_valid = this.trid_valid === true && this.trurl_valid === true && this.tr_images === true;
 
    
    
 
 
   }

  deleteimage(index: number) {

    this.titems.splice(index, 1); // Remove the item from the array
    this.toolimages.splice(index, 1); // Remove the item from the array
}
opentool(index : number): void {

  this._lightbox.open(this.titems, index);

}
  onFileChanged(event : any) {
    const file = event.target.files[0];
    // //console.log("from here--->",file);

    let _that = this;
    const reader = new FileReader();
    const inData = new FormData();
    inData.append('toolimage', file);
    reader.readAsDataURL(file);
    reader.onload = e => this.imageurl = reader.result;
    this.usr_ser.tlrq_img_upload(inData).subscribe((rdata : any) => {
        if (rdata.ret_data == "success") {
            let j = this.toolimages.length;
            this.toolimages[j] = rdata.path;
            this.lightbox(rdata.path)
            
            this.checkTrackValid(3)

        }
    });
}
lightbox(path : any) {

  this._lightboxConfig.showImageNumberLabel = true;
  this._lightboxConfig.showZoom = true;
  this._lightboxConfig.showRotate = true;
  this._lightboxConfig.showDownloadButton = true;
  this._lightboxConfig.fitImageInViewPort = true;
  this._lightboxConfig.albumLabel = '%1 of %2';


  const r_images = path;
  const srcValue = this.base_img_url + r_images;
  const caption = 'image' + '_';
  const title = '_Image';

  this.titems.push({src: srcValue, caption: caption, title: title});

}
usrFancybox() {

  this.track_reference=this.request_list.shipment_details['shm_reference'];
  this.track_id=this.request_list.shipment_details['shm_track_id'];
  this.track_url=this.request_list.shipment_details['shm_track_url'];
  this._lightboxConfig.showImageNumberLabel = true;
  this._lightboxConfig.showZoom = true;
  this._lightboxConfig.showRotate = true;
  this._lightboxConfig.showDownloadButton = true;
  this._lightboxConfig.fitImageInViewPort = true;
  this._lightboxConfig.albumLabel = '%1 of %2';

  for (let i = 0; i < this.usr_tool_images.length; i++) {

      const r_images = this.usr_tool_images[i];
      const srcValue = this.base_img_url + r_images.rmedia_url;
      const caption = 'image' + '_' + i;
      const title = 'smedia_id' + '_' + i;

      this.titems.push({src: srcValue, caption: caption, title: title});


  }
}
  toolrequestlist(){
    this.router.navigateByUrl('tool-request-list')
    
  }
  toolrequestlistaccept(){
    this.showMessage(' success.', 'success');
        setTimeout( () => {
         
    this.router.navigateByUrl('tool-request-list')
      }, 1000);

  }
  showMessage(msg = '', type = 'success') {
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

statusmaster(id:any,status:any){
this.button_act_state=1
if(status==51){
  this.nxtdata={
    order_id: this.request_list.order_id,
    status_id :status,
    track_id:this.track_id,
    track_url:this.track_url,
    track_reference:this.track_reference,
    tool_images:this.toolimages
  }
}else{
  this.nxtdata={
    order_id: this.request_list.order_id,
    status_id :status
  }
}
  


  
  this.usr_ser.update_order(this.nxtdata).subscribe((rdata: any) => {
    if (rdata.ret_data == 'success') {
      if(this.request_list.status_id==53){
      this.router.navigateByUrl('tool-sale');
      }else{
        window.location.reload()
      }
       
      
       
    }else{
      let no_data_msg=rdata.Message;
    }
});
}

admin_approval_list(){
  this.router.navigateByUrl('admin-approval')
}
Inspection_list(){
  this.router.navigateByUrl('tool-inspection-list')
}
Pending_list(){
  this.router.navigateByUrl('tool-request-page')
}
historypage(){
  this.router.navigateByUrl('tool-request-history')

}

cancelreq(id:any,type:any){
  this.button_act_state=1
  let data={
    'order_id':id,
    'order_pay':type,
    'rpt_id':this.request_list.rpt_id
  }

  this.usr_ser.order_payment(data).subscribe((rdata: any) => {
    if (rdata.ret_data == 'success') {
      
      this.router.navigateByUrl('tool-sale')
      
       
    }else{
      let no_data_msg=rdata.Message;
    }
});
}

changefunc(){



  let nxtdata={
      'order_id':this.request_list.order_id,
      'order_est_days':this.request_list.order_est_days,
      'order_act_days':this.request_list.order_act_days,
  }
  this.usr_ser.update_Date(nxtdata).subscribe((rdata: any) => {
    if (rdata.ret_data == 'success') {
      window.location.reload();
    }else{
      let no_data_msg=rdata.Message;
    }
});
  
}


}
