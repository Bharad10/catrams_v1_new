import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user-service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-banner-create',
  templateUrl: './banner-create.component.html',
  styleUrls: ['./banner-create.component.css']
})

export class BannerCreateComponent implements OnInit{

  BannerForm: FormGroup;
  ads_image: any = "assets/images/sample.jpeg";
  ads_name:string='';
  ads_desc:string='';
  ads_type:any;
  isSubmitForm1=false;
  button_act_state=0
  image_load_state=0
  banner_image:any='';
  base_version= (environment.base_version)
  selectedType: any;
  loading=false;
  constructor(
    private router:Router,
    private fb: FormBuilder,
    public set_serv:SettingsService,
    
  ) {
    this.BannerForm = this.fb.group({
      ads_name: ['', [Validators.required]],
      ads_type: 0,
      ads_desc:'',
      ads_image:['', [Validators.required]],
      base_version:[this.base_version]
  });
  
  }

 
  

  ban_create() {
    this.isSubmitForm1=true;
    if (this.BannerForm.valid) {
      this.proceed_confirm_modal()
     
    }else{}
   this.button_act_state=0
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


ngOnInit() {
  
}


onFileChanged(event: any) {
    this.image_load_state=1;
    if(this.base_version==='local'){
      const file = event.target.files[0];
      if (! file.type.startsWith('image/')) {
  
       this.showMessage("Please select a valid image file.", 'error')
       return;
   }
   const reader = new FileReader();
   this.banner_image= this.ads_image = reader.result
   const inData = new FormData();
   inData.append('banimage', file);
   reader.readAsDataURL(file);
   reader.onload = e =>this.banner_image= this.ads_image = reader.result;

   this.set_serv.ban_img_upload(inData).subscribe((rdata : any) => {
       if (rdata.ret_data == "success") {
         this.BannerForm.patchValue({
          ads_image: rdata.path
         });

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
           this.ads_image = reader.result as string;
            this.BannerForm.patchValue({
             ads_image: reader.result
            });
          };
        }else{
         this.showMessage("Please select a valid image file.", 'error')
        }
      }
    }

    this.image_load_state=0
  }

  

  bannerTypeChanged(event: any) {
    this.selectedType = event.target.value;
  if(this.selectedType=='tool'){
    this.BannerForm.patchValue({
      ads_type: 1
  });
  }else{
    this.BannerForm.patchValue({
      ads_type: 0
  });
  }
    
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

custom_confirm_modal()
  {

    Swal.fire({
      icon: 'warning',
      title: '',
      text: "Any Details will be lost!",
      showCancelButton: true,
      cancelButtonColor:"#888ea8",
      confirmButtonText: 'Proceed',
      confirmButtonColor:"#e7515a",
      padding: '2em',
      customClass: 'sweet-alerts',
      reverseButtons:true,
      allowOutsideClick:false,
      allowEscapeKey:false
  }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('banner-module')
          
      }
  });
  }

  proceed_confirm_modal()
  {

    Swal.fire({
      icon: 'warning',
      title: 'Create Advertisement',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonColor:"#888ea8",
      confirmButtonText: 'Proceed',
      confirmButtonColor:"#00ab55",
      padding: '2em',
      customClass: 'sweet-alerts',
      reverseButtons:true,
      allowOutsideClick:false,
      allowEscapeKey:false
  }).then((result) => {
      if (result.value) {
       
        this.button_act_state=1
        this.loading=true;
        this.set_serv.banner_create({'banner_data':this.BannerForm.value}).subscribe((rdata: any) => {
          if (rdata.ret_data === "success") {
            this.showMessage('Advertisement Created.', 'success');
            this.router.navigateByUrl('banner-module');
            
          } 
          else{
            this.showMessage(rdata.Message, 'error');
          }
        });
          
      }
  });
  }
 
}

