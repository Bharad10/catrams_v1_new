
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user-service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tool-create-module',
  templateUrl: './tool-create-module.component.html',
  styleUrls: ['./tool-create-module.component.css']
})
export class ToolCreateModuleComponent implements OnInit {

  ToolForm: FormGroup;
  imageurl: any = "assets/images/sample.jpeg";
  toolimage: any;
  adv_price: any;
  delay_price: any;
  dep_price: any;
  s_stock: any;
  image_tool: any;
  isSubmitForm1 = false;
  button_act_state = 0
  image_load_state = 0
  base_version = (environment.base_version)

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public usr_ser: UserService,
  ) {
    this.ToolForm = this.fb.group({
      toolname: ['', [Validators.required]],
      availablequantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      tooldescription: ['', [Validators.required]],
      imageurl: "",
      advancePayment: '',
      renttool_id: '',
      rentprice: '',
      rentstock: '',
      rentdelay: '',
      advanceflag: [false],
      depositflag: [false],
      depositamount: '',
      salestock: '',
      base_version: [this.base_version]
    });
  }

  adminsettings() {
    this.router.navigateByUrl('admin-approval');
  }

  onAdvanceFlagChange(event: any) {
    const checked = event.target.checked;
    if (checked) {
      this.ToolForm.patchValue({ depositflag: false });
    }
  }

  onDepositFlagChange(event: any) {
    const checked = event.target.checked;
    if (checked) {
      this.ToolForm.patchValue({ advanceflag: false });
    }
  }

  toolcreate() {
    this.isSubmitForm1 = true;
    this.ToolForm.patchValue({
      salestock: this.s_stock
    });
    if (this.ToolForm.valid) {
      this.button_act_state = 1
      this.usr_ser.tool_create(this.ToolForm.value).subscribe((rdata: any) => {
        if (rdata.ret_data === "success") {
          this.showMessage('Tool Created.', 'success');
          setTimeout(() => this.router.navigate(['/tool-package-list']), 500);
        }
        else {
          this.showMessage(rdata.Message, 'error');
        }
      });
      this.button_act_state = 0
    } else {
      this.button_act_state = 0
    }
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

  toollist() {
    this.router.navigateByUrl('tool-package-list');
  }

  ngOnInit() {
    const checkbox = document.getElementById('advanceflag') as HTMLInputElement;
    checkbox.addEventListener('change', () => {
      this.ToolForm.setValue({
        advanceflag: checkbox.checked ? 1 : 0
      });
      let dep = 0;
      let adv = 1;
    });
    const checkboxrent = document.getElementById('renttool_id') as HTMLInputElement;
    checkboxrent.addEventListener('change', () => {
      this.ToolForm.setValue({
        renttool_id: checkboxrent.checked ? 1 : 0
      });
    });
    const checkboxdeposit = document.getElementById('depositflag') as HTMLInputElement;
    checkboxdeposit.addEventListener('change', () => {
      this.ToolForm.setValue({
        depositflag: checkbox.checked ? 1 : 0
      });
      let dep = 1;
      let adv = 0;
    });
  }

  onFileChanged(event: any) {

    this.image_load_state = 1;
    if (this.base_version === 'local') {
      const file = event.target.files[0];
      if (!file.type.startsWith('image/')) {
        this.showMessage("Please select a valid image file.", 'error')
        return;
      }
      let _that = this;
      const reader = new FileReader();
      const inData = new FormData();
      inData.append('toolimage', file);
      reader.readAsDataURL(file);
      reader.onload = e => this.imageurl = reader.result;
      this.usr_ser.tool_image_upload(inData).subscribe((rdata: any) => {
        if (rdata.ret_data == "success") {
          this.ToolForm.patchValue({ imageurl: rdata.path });
        }
      });
    } else {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        let filetype = event.target.files[0].type.split("/", 1);
        if (filetype[0] == 'image') {
          const [file] = event.target.files;
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imageurl = reader.result as string;
            this.ToolForm.patchValue({
              imageurl: reader.result
            });
          };
        } else {
          this.showMessage("Please select a valid image file.", 'error')
        }
      }
    }
    this.image_load_state = 0;
  }

  stock_div() {
    this.s_stock = this.ToolForm.value['availablequantity'];
  }

  rentprice_cal() {
    let price = this.ToolForm.value['price'];
  }

  advpercent_cal() {
    let price = this.ToolForm.value['rentprice'];
    let adv_p = this.ToolForm.value['advancePayment'];
    this.adv_price = (price * adv_p) / 100;
  }

  stock_cal() {
    let rentstock = this.ToolForm.value['rentstock'];
    let availablequantity = this.ToolForm.value['availablequantity'];
    this.s_stock = availablequantity - rentstock;
  }

  delay_cal() {
    let price = this.ToolForm.value['rentprice'];
    let del_per = this.ToolForm.value['rentdelay'];
    this.delay_price = (price * del_per) / 100;
  }

  depost_cal() {
    let price = this.ToolForm.value['rentprice'];
    let depositamount = this.ToolForm.value['depositamount'];
    let dep_price = (price * depositamount) / 100
    this.dep_price = price + dep_price;
  }

  compressImage(file: File, quality: number, callback: (compressedFile: File) => void) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
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
