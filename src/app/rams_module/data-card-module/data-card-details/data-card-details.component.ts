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


@Component({
    selector: 'app-data-card-details',
    templateUrl: './data-card-details.component.html',
    styleUrls: ['./data-card-details.component.css'],
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [
                style(
                    {opacity: 0, transform: 'scale(0.95)'}
                ),
                animate('100ms ease-out', style({opacity: 1, transform: 'scale(1)'}))
            ]),
            transition(':leave', [animate('75ms', style({opacity: 0, transform: 'scale(0.95)'}))]),
        ]),


    ]
})
export class DataCardDetailsComponent {
    srid : string;
    serv_pack_list : any;
    value : any;
    key_word : any = 'us_firstname';
    reason : any;
    swiper1 : any;
    items2 = ['sample.jpeg', 'sample2.png', 'sample3.png'];
    medias : any;
    base_version= (environment.base_version)
    baseurl=this.base_version==='local'? environment.base_img_url:'';
    allcontrols = true;
    items : any = [];
    titems : any = [];
    selectedFile = null;
    role_id : any;
    us_id : any;
    buttonloader = 0;
    imageurl : any = "assets/images/sample.jpeg";
    loader : boolean = true;
    img_loader : boolean = false;
    datacardimage : any = [];
    usritems : any = [];

    constructor(private router : Router, private usr_ser : UserService, private activerouter : ActivatedRoute, private _lightbox : Lightbox, private _lightboxConfig : LightboxConfig) {
        this.role_id = localStorage.getItem("us_role_id");
        this.role_id = atob(atob(this.role_id));
        this.us_id = localStorage.getItem("us_id");
        this.us_id = atob(atob(this.us_id));
        this.srid = this.activerouter.snapshot.paramMap.get('id')!;


        this.usr_ser.fetch_service_details(this.srid).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.serv_pack_list = rdata.result;
                this.medias = rdata.medias;
                this.baseurl=this.base_version==='local'?this.baseurl:rdata.imageurl;
                _lightboxConfig.enableTransition = false;
                _lightboxConfig.wrapAround = true;
                _lightboxConfig.positionFromTop = 0;
                _lightboxConfig.disableScrolling = true;

                this.bindFancybox()
                this.openbox();
                this.loader = false;
            }


        });


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
            }

        }


    }

    copytext(text : any) {
        navigator.clipboard.writeText(text);
        this.coloredToast('info', 'Text Copied!!')
    }


    open(index : number): void {
        this._lightbox.open(this.items, index);
    }


    ngOnInit() {}

    addItem() {}

    removeItem(item : any = null) {
        this.items = this.items.filter((d : any) => d.id != item.id);
    }

    requested_details(id : any) {
        this.usr_ser.fetch_request_details(id).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                let FileType = rdata.sourceFileType;

            } else {

            }
        });

    }


    servlist() {
        this.router.navigateByUrl('data-card-module');
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
    coloredToast(color : string, msg = '') {
        const toast = Swal.mixin({
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
            customClass: {
                popup: `color-${color}`
            },
            target: document.getElementById(color + '-toast') || 'body'
        });
        toast.fire({title: msg});
    }

    onFileChanged(event : any) {
        this.img_loader = true;
        if(this.base_version==='local'){
            

            const file = event.target.files[0];
            if (! file.type.startsWith('image/')) {
                this.showMessage("Please select a valid image file.", 'error')
                return;
            }
                const inData = new FormData();
                inData.append('toolimage', file);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = e => this.imageurl = reader.result;
                this.usr_ser.datacard_image_upload(inData).subscribe((rdata : any) => {
                    if (rdata.ret_data == "success") {
                        let j = this.datacardimage.length;
                        this.datacardimage[j] = rdata.path;
                        this.lightbox(rdata.path)
                        this.imageurl = "assets/images/sample.jpeg";
    
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
                  this.usr_ser.datacard_image_upload({'data_card_image':reader.result}).subscribe((rdata : any) => {
                    if (rdata.ret_data == "success") {
                        let j = this.datacardimage.length;
                        this.datacardimage[j] = rdata.path;
                        this.lightbox(rdata.path)
                        this.imageurl = "assets/images/sample.jpeg";
                        this.baseurl=rdata.image_url
    
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
        const srcValue = this.baseurl + r_images;
        const caption = 'image' + '_';
        const title = '_Image';
        this.titems.push({src: srcValue, caption: caption, title: title});
        this.img_loader = false;
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

    opentool(index : number): void {

        this._lightbox.open(this.titems, index);

    }
    openusr(index : number): void {

        this._lightbox.open(this.usritems, index);

    }

    data_card_upload() {

        const data = {
            'data_card_images': this.datacardimage,
            'custveh_id': this.serv_pack_list.custveh_id
        }

        this.usr_ser.data_card_upload(data).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {

                this.showMessage("Data Card Uploaded", 'success')
                setTimeout(() => {
                    this.router.navigateByUrl('data-card-module')
                }, 500);
            } else {

            }
        });

    }
    deleteimage(index : number) {

        this.titems.splice(index, 1); // Remove the item from the array
        this.datacardimage.splice(index, 1); // Remove the item from the array
        this.imageurl = "assets/images/sample.jpeg";

    }


    compressImage(file : File, quality : number, callback : (compressedFile : File) => void) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event : any) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    const width = img.width;
                    const height = img.height;
                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            const compressedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now()
                            });
                            callback(compressedFile);
                        }
                    }, 'image/jpeg', quality);
                } else {
                    console.error('Failed to get 2D context');
                }
            };
        };
    }
}
