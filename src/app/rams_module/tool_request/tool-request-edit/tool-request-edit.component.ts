import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {UserService} from 'src/app/service/user-service/user.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {environment} from 'src/environments/environment';
import * as moment from 'moment';
import {Lightbox, LightboxConfig} from 'ngx-lightbox';
import { slideDownUp } from 'src/app/shared/animations';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-tool-request-edit',
    templateUrl: './tool-request-edit.component.html',
    styleUrls: ['./tool-request-edit.component.css'],
    animations: [ slideDownUp
    ]
})
export class ToolRequestEditComponent implements OnInit {
    
    
    accordians3:any =4 ;
    
    ToolRequestForm : FormGroup;
    statusPoints : string[] = [
        'Order Pending',
        'Order Created',
        'Order Shipped',
        'Order in Pursuit',
        'Order Delivered'
    ];
    currentStatusIndex = 0;
    tdetails : any;
    request_list : any;
    trid : any;
    history_list : any;
    return_data : any;
    base_img_url = environment.base_img_url;
    r_images : any;
    images : {
        path: string
    }[] = [];
    recieve_Date : any;
    recieve_time : any;
    due_Date : any;
    due_time : any;
    hold = '0' ;
    revtldt_due_date : any;
    approval_Data : any;
    rejectreason: string = '';
    isValid: boolean = false;
    button_act_state = 0;
    actual_price = 0.00;
    updated_deposit : any;
    advance_price : any;
    updated_advance : any;
    items : any = [];
    titems : any = [];
    usritems : any = [];
    deposit_price : any;
    total_amount : any;
    coupon_id : any;
    track_id :string = '';
    trid_valid:boolean=false;
    track_url :string = '';
    trurl_valid:boolean=false;
    track_reference = '';
    imageurl : any = "assets/images/sample.jpeg";
    toolimages : any = []
    tr_images:boolean=false;
    usr_tool_images : any = []
    rent_price:any;
    track_valid:boolean=false
    bktab = 'bk1'
    loader:boolean=true;
    r_time=environment.reload_time
    base_version=environment.base_version
    constructor(private fb : FormBuilder,private datePipe:DatePipe,
         private usr_ser : UserService, private router : Router,
          private activerouter : ActivatedRoute, 
          private _lightbox : Lightbox,
           private _lightboxConfig : LightboxConfig
           
           ) {
        this.ToolRequestForm = this.fb.group({
            toolname: '',
            availablequantity: '',
            quantity: '',
            price: '',
            tooldescription: '',
            rentdays: '',
            toolid: this.trid


        });
        _lightboxConfig.enableTransition = false;
        _lightboxConfig.wrapAround = true;
        _lightboxConfig.positionFromTop = 0;
        _lightboxConfig.disableScrolling = true;

    }
    checkRejectReason() {
        
        this.isValid = this.rejectreason.trim().length > 0;
      }
    updateStatus() {
        if (this.currentStatusIndex<this.statusPoints.length - 1) {
      this.currentStatusIndex++;
    }
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
  ngOnInit(){
    const encodedRoleId = this.activerouter.snapshot.paramMap.get('id')!;
    
      this.tdetails = atob(encodedRoleId);
      this.fetch_list(encodedRoleId,0)

//       setInterval(() => {
//        this.fetch_list(encodedRoleId,1);
//    }, this.r_time);
   
      
        
    }

    fetch_list(encodedRoleId:any,type:number){
        this.loader=true;

        this.usr_ser.tool_req_details(encodedRoleId).subscribe((rdata: any) => {
            if (rdata.ret_data === 'success') {
                setTimeout(() => {
                    this.request_list = rdata.req_list;
                    this.recieve_Date = this.request_list.tldt_R_date;
                    this.approval_Data = rdata.approval_Data
                    this.recieve_Date = this.datePipe.transform(this.request_list.tldt_R_date, 'dd-MMM-yyyy ');
                    this.recieve_time =this.datePipe.transform(this.request_list.tldt_R_date, ' hh:mm a');
                    this.due_Date = moment(this.request_list.tldt_due_date).format("YYYY-MM-DD");
                    this.due_time = moment(this.request_list.tldt_due_date).format("HH:mm:ss");
                    this.actual_price = this.request_list.tldt_cost;
                    this.base_img_url=this.base_version==='local'?this.base_img_url:rdata.imageurl
                    this.usr_tool_images = rdata.req_list.usr_tool_images;
                    if ((this.usr_tool_images.length) > 0) {
                        this.usrFancybox()
                    }
                    if (rdata.req_list.coupon_id == 0) {
                        this.coupon_id = 0
                    }
                    this.depositcost()
                    this.advancecost()


                }, 2500);
            } else {
                let no_data_msg = rdata.Message;
            }
        }) 
        
        let data = {
            'tr_id': this.tdetails
        }
        this.usr_ser.fetch_request_status(data).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.history_list = rdata.toolrqst.history_details;
                this.r_images = rdata.tlrq_imgs_r;
                this.bindFancybox()
            } else {
                let no_data_msg = rdata.Message;
            }
        });
        if(type==0){
            setTimeout(() => {
                this.loader=false;  
            }, 1500);
        }else{
            setTimeout(() => {
                this.loader=false;  
            }, 1500);
            window.location.reload();
        }
       
    }
    getClass() {
        if (this.request_list.tool_deposit_id === 1) {
          return 'deposit';
        } else if (this.request_list.tool_adv_payment === 1) {
          return 'adv';
        } else{
            return 'deposit';
        }
      }
    bindFancybox() {
        this._lightboxConfig.showImageNumberLabel = true;
        this._lightboxConfig.showZoom = true;
        this._lightboxConfig.showRotate = true;
        this._lightboxConfig.showDownloadButton = true;
        this._lightboxConfig.fitImageInViewPort = true;
        this._lightboxConfig.albumLabel = '%1 of %2';

        for (let i = 0; i < this.r_images.length; i++) {

            const r_images = this.r_images[i];
            const srcValue = this.base_img_url + r_images.trt_url;
            const caption = 'image' + '_' + i;
            const title = 'smedia_id' + '_' + i;

            this.items.push({src: srcValue, caption: caption, title: title});


        }

    }
    deleteimage(index: number) {
       
        this.titems.splice(index, 1); // Remove the item from the array
        this.toolimages.splice(index, 1); // Remove the item from the array
        this.checkTrackValid(3)

    }
    usrFancybox() {
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

            this.usritems.push({src: srcValue, caption: caption, title: title});


        }
    }

    open(index : number): void {

        this._lightbox.open(this.items, index);
    }

    opentool(index : number): void {

        this._lightbox.open(this.titems, index);
    }
    opentoolusr(index : number): void {

        this._lightbox.open(this.usritems, index);
    }
    depositcost() {
        this.deposit_price = ((this.request_list.tldt_cost) * (this.request_list.tool_deposit_price)) / 100;
        this.updated_deposit = (this.request_list.tldt_cost - this.deposit_price);

        this.total_amount = parseFloat(this.request_list.tldt_cost) - parseFloat(this.deposit_price);
        this.deposit_price = parseFloat(this.deposit_price).toFixed(2);
        this.updated_deposit = parseFloat(this.updated_deposit).toFixed(2);
        this.total_amount = parseFloat(this.total_amount).toFixed(2);

    }

    advancecost() {
        this.advance_price = ((this.request_list.tldt_cost) * (this.request_list.tool_adv_price)) / 100


        this.total_amount = parseFloat(this.request_list.tldt_cost) - parseFloat(this.advance_price);

        this.updated_advance = (this.request_list.tldt_cost - this.advance_price);
        this.advance_price = parseFloat(this.advance_price).toFixed(2);
        this.updated_advance = parseFloat(this.updated_advance).toFixed(2);
        this.total_amount = parseFloat(this.total_amount).toFixed(2);
    }

    toolrequestlist() {
        this.router.navigateByUrl('tool-request-list')

    }
    toolrequestlistaccept() {
        this.showMessage(' success.', 'success');
        setTimeout(() => {

            this.router.navigateByUrl('tool-request-list')
        }, 1000);

    }
    showMessage(msg = '', type = 'success') {
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

    statusmaster(data : any) {

        this.button_act_state = 1;
        let id = data.status_id
        let toolid = data.tool_req_id

        if (data.status_id == 8) {
            const track_id = this.track_id
            const track_url = this.track_url
            const track_reference = this.track_reference
            let nxtdata = {
                status_id: id,
                tr_id: toolid,
                track_id: track_id,
                track_url: track_url,
                track_reference: track_reference,
                tool_images: this.toolimages
            }
            setTimeout(() => {
                this.usr_ser.status_master_controller(nxtdata).subscribe((rdata : any) => {

                    if (rdata.ret_data == 'success') {
                        this.return_data = rdata.return_data
                        this.router.navigateByUrl('tool-request-edit');

                        window.location.reload();
                    } else {
                        let no_data_msg = rdata.Message;
                    }
                });
            }, 1000);

        } else {
            const track_id = 0
            const track_url = 0
            const track_reference = 0
            let nxtdata = {
                status_id: id,
                tr_id: toolid,
                track_id: track_id,
                track_url: track_url,
                track_reference: track_reference

            }
            setTimeout(() => {
                this.usr_ser.status_master_controller(nxtdata).subscribe((rdata : any) => {

                    if (rdata.ret_data == 'success') {
                        this.return_data = rdata.return_data
                        this.router.navigateByUrl('tool-request-edit');

                        window.location.reload();
                    } else {
                        let no_data_msg = rdata.Message;
                    }
                });
            }, 1000);
        }


    }
    change_to_tracking(){
        this.accordians3=3;
    }
    update_tracking_details(data:any){
        this.button_act_state = 1;
        let id = data.tldt_status
        let toolid = data.tldet_id

        
            const track_id = this.track_id
            const track_url = this.track_url
            const track_reference = this.track_reference
            let nxtdata = {
                status_id: id,
                tr_id: toolid,
                track_id: track_id,
                track_url: track_url,
                track_reference: track_reference,
                tool_images: this.toolimages
            }
            setTimeout(() => {
                this.usr_ser.status_master_controller(nxtdata).subscribe((rdata : any) => {

                    if (rdata.ret_data == 'success') {
                        this.return_data = rdata.return_data
                      

                        window.location.reload();
                    } else {
                        let no_data_msg = rdata.Message;
                    }
                });
            }, 1000);
    }

    admin_approval_list() {
        this.router.navigateByUrl('admin-approval')
    }
    Inspection_list() {
        this.router.navigateByUrl('tool-inspection-list')
    }
    Pending_list() {
        this.router.navigateByUrl('tool-request-page')
    }
    historypage() {
        this.router.navigateByUrl('tool-request-history')

    }

    date_adjust() {

        let nxtdata = {
            tldt_due_date: this.revtldt_due_date,
            tldet_id: this.request_list.tldet_id,
            am_id: this.approval_Data.am_id
        }
        this.usr_ser.due_Date_adjust(nxtdata).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.return_data = rdata.return_data
                this.router.navigateByUrl('tool-request-edit');
                setTimeout(() => {
                    window.location.reload()
                }, 800);
                


            } else {
                let no_data_msg = rdata.Message;
            }
        });

    }


    hold_function($event : any) {

        const selectedDate = $event.target.value;
        const currentTime = moment().format("HH:mm:ss");
        const combinedDateTime = `${selectedDate} ${currentTime}`;
        this.revtldt_due_date = combinedDateTime;

        this.hold = '1'


    }

    deletereq(id : any) {
        this.button_act_state = 1;
        let data = {
            'data': id,
            'flag': 1,
            'rejectreason': this.rejectreason
        }


        this.usr_ser.tool_req_accept(data).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.button_act_state = 0;

                this.showMessage(rdata.Message, 'success');
                this.router.navigateByUrl('tool-request-list');
            } else {
                this.showMessage(rdata.Message, 'success');
            }
        });

    }

    acceptrequest(data : any) {
        this.button_act_state = 1;
        data['advance_price'] = this.advance_price;
        data['deposit_price'] = this.deposit_price;
        let t_details = {
            data: data
        };


        this.usr_ser.tool_req_accept(t_details).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {

                this.showMessage(rdata.Message, 'success');
               
                window.location.reload();

            } else {
                this.showMessage(rdata.Message, 'success');
                this.router.navigateByUrl('tool-request-list');

            }
        });
    }

    onFileChanged(event : any) {
        if(this.base_version==='local'){
            const file = event.target.files[0];

            let _that = this;
            const reader = new FileReader();
            const inData = new FormData();
            inData.append('toolimage', file);
            reader.readAsDataURL(file);
            reader.onload = e => this.imageurl = reader.result;
            this.usr_ser.tool_image_upload(inData).subscribe((rdata : any) => {
                if (rdata.ret_data == "success") {
                    let j = this.toolimages.length;
                    this.toolimages[j] = rdata.path;
                    this.lightbox(rdata.path)
                    this.checkTrackValid(3)
                  
    
                }
                
            });
        }else{
            const reader = new FileReader();
        if(event.target.files && event.target.files.length) {
          let filetype=event.target.files[0].type.split("/",1);
          
          if(filetype[0]=='image'){
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
             this.imageurl = reader.result as string;
              this.usr_ser.tool_image_upload({'toolimage':reader.result}).subscribe((rdata : any) => {
                if (rdata.ret_data == "success") {
                    let j = this.toolimages.length;
                    this.toolimages[j] = rdata.path;
                    this.lightbox(rdata.path)
                    this.checkTrackValid(3)
                  
    
                }
            });
            };
          }else{
           this.showMessage("Please select a valid image file.", 'error')
          }
        }
        }

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

    wk_det(id : any) {
        this.router.navigateByUrl('work-card-create/' + (
            btoa(id)
        ));
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
        this.loader=true;
        this.date_adjust()
          
      }
  });
  }

}