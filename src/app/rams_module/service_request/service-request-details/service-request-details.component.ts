import {Component} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import Swal from 'sweetalert2';
import {UserService} from 'src/app/service/user-service/user.service';
import {Lightbox, LightboxConfig} from 'ngx-lightbox';
import {Router, ActivatedRoute} from '@angular/router';
import {NgModel} from '@angular/forms';
import Swiper, {Autoplay, Navigation, Pagination} from 'swiper';
import {NgOptimizedImage} from '@angular/common'
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import { slideDownUp } from 'src/app/shared/animations';
@Component({
    selector: 'app-service-request-details',
    templateUrl: './service-request-details.component.html',
    styleUrls: ['./service-request-details.component.css'],
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [
                style(
                    {opacity: 0, transform: 'scale(0.95)'}
                ),
                animate('100ms ease-out', style({opacity: 1, transform: 'scale(1)'}))
            ]),
            transition(':leave', [animate('75ms', style({opacity: 0, transform: 'scale(0.95)'}))]),
        ]),slideDownUp


    ]
})


export class ServiceRequestDetailsComponent {
    accordians3:any= 1
    srid : string;
    serv_pack_list : any;
    value : any;
    user_list : any;
    key_word : any = 'us_firstname';
    reason : any;
    swiper1 : any;
    items2 = ['sample.jpeg', 'sample2.png', 'sample3.png'];
    medias : any;
    base_version=environment.base_version
    baseurl =this.base_version==='locale'? environment.base_img_url:'';
    vendor_list : any;
    vendor_id : any;
    allcontrols = true;
    items : any = [];
    selectedFile = null;
    role_id : any;
    us_id : any;
    buttonloader = 0;
    usritems : any = [];
    date : any;
    documents : any = [];
    audiofiles = '';
    loader=true;
    isubmitvendorFlag:boolean=false;
    isubmitvendorValid:boolean=false;
   
    constructor(private router : Router, private usr_ser : UserService, private activerouter : ActivatedRoute, private _lightbox : Lightbox, private _lightboxConfig : LightboxConfig, private datePipe : DatePipe, private http : HttpClient) {
        this.role_id = localStorage.getItem("us_role_id");
        this.role_id = atob(atob(this.role_id));
        this.us_id = localStorage.getItem("us_id");
        this.us_id = atob(atob(this.us_id));
        this.srid = this.activerouter.snapshot.paramMap.get('id')!;


        this.usr_ser.fetch_service_details(this.srid).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.serv_pack_list = rdata.result;
                this.baseurl=this.base_version==='local'?this.baseurl:rdata.imageurl
                if(this.serv_pack_list['serm_vendor_flag']==1){
            this.expert_reject_warning(this.serv_pack_list.expert_details['status_Details'])
        }
                this.medias = rdata.medias;
                _lightboxConfig.enableTransition = false;
                _lightboxConfig.wrapAround = true;
                _lightboxConfig.positionFromTop = 0;
                _lightboxConfig.disableScrolling = true;
                this.openbox();
                this.bindFancybox()
                this.date = this.datePipe.transform(this.serv_pack_list.serm_createdon, 'dd-MMM-yyyy hh:mm a');
                if ((this.serv_pack_list.cus_media.documents.length) > 0) {
                    this.documents = this.serv_pack_list.cus_media.documents;
                }
            }


        });
        this.usr_ser.fetch_user().subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.user_list = rdata.user_list


            }

        });
        this.usr_ser.fetch_vendors_list().subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.vendor_list = rdata.vend_list


            }

        });
        this.loader=false;
    }

    expert_reject_warning(status_Details:any){
        //console.log("status0000000000",status_Details);
        
        if(status_Details.vm_status==2){
            this.coloredToast("danger","Request has been Rejected by Expert!!!","top-end")
        }
    }


    bindFancybox() {

        this._lightboxConfig.showImageNumberLabel = true;
        this._lightboxConfig.showZoom = true;
        this._lightboxConfig.showRotate = true;
        this._lightboxConfig.showDownloadButton = true;
        this._lightboxConfig.fitImageInViewPort = true;
        this._lightboxConfig.albumLabel = '%1 of %2';

        for (let i = 0; i < this.medias.length; i++) {
            if (this.medias[i]['smedia_type'] == 0) {
                const media = this.medias[i];
                const srcValue = this.baseurl + media.smedia_url;
                const caption = 'image' + '_' + i;
                const title = 'smedia_id' + '_' + i;

                this.items.push({src: srcValue, caption: caption, title: title});
            } else {
                const media = this.medias[i];
                this.audiofiles = this.baseurl + media.smedia_url;

            }

        }


    }

    open(index : number): void {


        this._lightbox.open(this.items, index);
    }
    opendatacard(index : number): void {


        this._lightbox.open(this.usritems, index);
    }


    ngOnInit() {}


    removeItem(item : any = null) {
        this.items = this.items.filter((d : any) => d.id != item.id);
    }

    requested_details(id : any) {

        this.usr_ser.fetch_request_details(id).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {


                let FileType = rdata.sourceFileType;

            } else {}
        });

    }


    sendquote() {
        this.router.navigateByUrl('/quotation-create/' + this.srid + '/' + this.serv_pack_list.qtm_id);

    }
    servlist() {
        this.router.navigateByUrl('service-request-list');
    }

    request_reject() {
        this.buttonloader = 1
        this.loader=true
        this.usr_ser.reject_request({serm_id: this.srid,reason: this.reason}).subscribe((rdata : any) => {
            if (rdata.ret_data === 'success') {
                this.showMessage('Request rejected successfully.', 'success');
                this.router.navigateByUrl('service-request-list')
            } else {
                this.showMessage(rdata.Message, 'error');
               
            }
        });
    }
    accept_request() {
        this.buttonloader = 1
        this.loader=true
        this.usr_ser.accept_request({serm_id:atob(this.srid)}).subscribe((rdata : any) => {
            if (rdata.ret_data === 'success') { 
                this.showMessage('Request Accepted.', 'success');
                window.location.reload();
            } else {
                this.showMessage(rdata.Message, 'error');

            }
        });
    }
    vendor_request() {
        
        
        if(this.vendor_id!==-1){
            this.loader=true;
            this.usr_ser.update_assigne({serm_id: this.srid,serm_assigne:this.vendor_id,flag: 1}).subscribe((rdata : any) => {
                if (rdata.ret_data === 'success') {
                    this.showMessage('Assigned successfully.', 'success');
                    this.router.navigateByUrl('service-request-list')
                } else {
                    this.showMessage('Internal Server Error!!!Please contact Admin.', 'error');
                }
            });
        }else{this.isubmitvendorValid=true}
        
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

    ngAfterViewInit() {
        this.swiper1 = new Swiper('#slider1', {
            modules: [
                Navigation, Pagination, Autoplay
            ],
            navigation: {
                nextEl: '.swiper-button-next-ex1',
                prevEl: '.swiper-button-prev-ex1'
            },
            autoplay: {
                delay: 200
            },
            pagination: {
                el: '#slider1 .swiper-pagination',
                type: 'bullets',
                clickable: true
            }
        });
    }

    selectEvent(event : any, type : any) {
      this.loader=true;
        if (type == 0) {
            let data = {
                data: event,
                serm_id: this.serv_pack_list['serm_id']
            }
            this.usr_ser.update_assigne(data).subscribe((rdata : any) => {
                if (rdata.ret_data === 'success') {
                    window.location.reload()
                } else {}
            });
        } else {
            let data = {
                data: this.us_id,
                serm_id: this.serv_pack_list['serm_id']
            }
            this.usr_ser.update_assigne(data).subscribe((rdata : any) => {
                if (rdata.ret_data === 'success') {
                    window.location.reload()
                } else {}
            });
        }
        
      

    }

    openbox() {
        this._lightboxConfig.showImageNumberLabel = true;
        this._lightboxConfig.showZoom = true;
        this._lightboxConfig.showRotate = true;
        this._lightboxConfig.showDownloadButton = true;
        this._lightboxConfig.fitImageInViewPort = true;
        this._lightboxConfig.albumLabel = '%1 of %2';


        for (let i = 0; i < this.serv_pack_list.data_cards.length; i++) {

            const r_images = this.serv_pack_list.data_cards[i];
            const srcValue = this.baseurl + r_images.cvehcard_url;
            const caption = 'image' + '_' + i;
            const title = 'smedia_id' + '_' + i;

            this.usritems.push({src: srcValue, caption: caption, title: title});


        }

    }

    copytext(text:any) {
      
        navigator.clipboard.writeText(text);
   
        
  
        
      }

    // document_download(){

    // const url = this.documents[0]['rmedia_url'];
    // const filename = url.substring(url.lastIndexOf('/') + 1); // Extract filename from URL
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = filename; // Set the filename for the downloaded file
    // a.click();
    // }
    document_download() {
        const rmedia_url = this.documents[0]['rmedia_url'];
        const baseUrl = this.baseurl;
        // Replace this with your server base URL

        // Construct the full URL
        const fullUrl = baseUrl + rmedia_url;

        // Send GET request to download the file
        this.http.get(fullUrl, {responseType: 'blob'}).subscribe((response : Blob) => { // Create a blob object URL for the response
            const fileURL = URL.createObjectURL(response);

            // Create a link element
            const link = document.createElement('a');
            link.href = fileURL;

            // Set the download attribute with the filename
            link.setAttribute('download', rmedia_url);

            // Append the link to the body
            document.body.appendChild(link);

            // Click the link programmatically to trigger the download
            link.click();

            // Cleanup: Remove the link and revoke the object URL
            document.body.removeChild(link);
            URL.revokeObjectURL(fileURL);
        });
    }

    coloredToast(color: string,msg = '',pos:any) {
        const toast = Swal.mixin({
            toast: true,
            position: pos,
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
            customClass: {
                popup: `color-${color}`,
            },
            target: document.getElementById(color + '-toast') || 'body',
        });
        toast.fire({
            title: msg,
        });
    }

    requestConfirmModal()
    {
  
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Accept Request',
         confirmButtonColor:'#00ab55',
        reverseButtons:true,
        padding: '2em',
        customClass: 'sweet-alerts',
    }).then((result) => {
        if (result.value) {
          this.accept_request()
            
        }
    });
    }

    requestRejectModal()
    {
  
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure to reject this request?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Reject Request',
         confirmButtonColor:'#e7515a',
        reverseButtons:true,
        padding: '2em',
        customClass: 'sweet-alerts',
    }).then((result) => {
        if (result.value) {
          this.request_reject()
            
        }
    });
    }
}
