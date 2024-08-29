import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tool-edit-module',
  templateUrl: './tool-edit-module.component.html',
  styleUrls: ['./tool-edit-module.component.css']
})
export class ToolEditModuleComponent {

  ToolForm: FormGroup;
  imageurl: any = 'assets/images/sample.jpeg';
  toolid: any;
  t_id: any;
  tool_details: any;
  baseurl = environment.base_img_url;
  s_stock: any;
  adv_price: any;
  delay_price: any;
  dep_price: any;
  isSubmitForm1 = false;
  button_act_state = 0
  image_load_state = 0
  tool_rent_id = false;
  advanceflag = false;
  depositflag = false;
  loader:boolean=true;
  constructor(
    private fb: FormBuilder,
    private usr_ser: UserService,
    private router: Router,
    private activerouter: ActivatedRoute,
  ) {
    const encodedRoleId = this.activerouter.snapshot.paramMap.get('id')!;
    this.t_id = encodedRoleId
    this.toolid = atob(encodedRoleId);
    this.ToolForm = this.fb.group({
      toolid: '',
      toolname: '',
      imageurl: '',
      tool_total_quantity: '',
      tool_sale_quantity: "",
      tool_cost: '',
      tooldescription: '',
      tool_rent_id: '',
      tool_rent_quantity: '',
      tool_rent_cost: '',
      tool_delay_percentage: '',
      tool_deposit_id: 0,
      tool_deposit_price: '',
      tool_adv_payment: 0,
      tool_adv_price: '',
      advanceflag: false,
      depositflag: false,
    });
  }

  adminsettings() {
    this.router.navigateByUrl('admin-approval');
  }

  onAdvanceFlagChange(event: any) {
    const checked = event.target.checked;
    if (checked) {
      this.ToolForm.patchValue({ tool_adv_payment: 1,tool_deposit_id:0,advanceflag:true,depositflag:false });
    }
  }

  onDepositFlagChange(event: any) {
    const checked = event.target.checked;
    if (checked) {
      this.ToolForm.patchValue({ tool_adv_payment: 0,tool_deposit_id:1,advanceflag:false,depositflag:true });
    }
  }

  ngOnInit() {
    this.usr_ser.fetch_tool_details(this.t_id).subscribe((rdata: any) => {

      if (rdata.ret_data == 'success') {
        this.ToolForm.setValue({
          toolid: rdata.tool_details.tool_id,
          toolname: rdata.tool_details.tool_name,
          imageurl: rdata.tool_details.tool_images,
          tool_total_quantity: rdata.tool_details.tool_total_quantity,
          tool_sale_quantity: rdata.tool_details.tool_sale_quantity,
          tool_cost: rdata.tool_details.tool_cost,
          tooldescription: rdata.tool_details.tool_description,
          tool_rent_id: rdata.tool_details.tool_rent_id,
          tool_rent_quantity: rdata.tool_details.tool_rent_quantity,
          tool_rent_cost: rdata.tool_details.tool_rent_cost,
          tool_delay_percentage: rdata.tool_details.tool_delay_percentage,
          tool_deposit_id: rdata.tool_details.tool_deposit_id  == '1'? 1:0,
          tool_deposit_price: rdata.tool_details.tool_deposit_price,
          tool_adv_payment: rdata.tool_details.tool_adv_payment == '1'? 1:0,
          tool_adv_price: rdata.tool_details.tool_adv_price,
          advanceflag: rdata.tool_details.tool_adv_price==='0'?false:true,
          depositflag: rdata.tool_details.tool_deposit_id==='0'?false:true,
        });
        this.advanceflag= this.ToolForm.value['advanceflag'][0];
        this.depositflag= this.ToolForm.value['depositflag'][0];
        this.imageurl = this.baseurl + rdata.tool_details.tool_images;
        this.delay_cal();
        if (rdata.tool_details.tool_rent_id == 1) {
          this.tool_rent_id = true;
          this.rent_methoed(rdata);
          this.stock_cal();
          this.delay_cal();
        }
        this.loader=false;
      }
    });
  }

  rent_methoed(rdata: any) {
    if (rdata.tool_details.tool_adv_payment == 1) {
      this.advanceflag = true;
      this.advpercent_cal();
    } else if (rdata.tool_details.tool_deposit_id == 1) {
      this.depositflag = true;
      this.depost_cal()
    }
  }

  toollist() {
    this.router.navigateByUrl('/tool-package-list');
  }

  toolupdate() {
    let tooldata =
      { 'tool_data': this.ToolForm.value }
    this.usr_ser.update_tool_details({tool_data:this.ToolForm.value }).subscribe((rdata: any) => {
      if (rdata.ret_data === "success") {
        this.showMessage('Tool Updated.', 'success');
        setTimeout(() => this.router.navigate(['/tool-package-list']), 500);
      }
      else {
        this.showMessage(rdata.Message, 'error');
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

  selectedFile = null;
  onFileChanged(event: any) {
    const file = event.target.files[0];
    let _that = this;
    const reader = new FileReader();
    const inData = new FormData();
    inData.append('toolimage', file);
    reader.readAsDataURL(file);
    reader.onload = e => this.imageurl = reader.result;
    this.usr_ser.tool_image_upload(inData).subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        this.ToolForm.value.imageurl = rdata.path;
        let filetype = rdata.file.split("/", 1);
        if (filetype[0] == "image") {
          filetype = 1;
        } else if (filetype[0] == "audio") {
          filetype = 2;
        } else if (filetype[0] == "video") {
          filetype = 4;
        } else {
          filetype = 3;
        }
        let fileinfo = {
          ftype: filetype,
          fname: "uploads\\purchaseorderbillImages\\" + rdata.img_name
        }
      }
    });
  }

  stock_div() {
    this.s_stock = this.ToolForm.value['tool_total_quantity'];
  }

  rentprice_cal() {
    let price = this.ToolForm.value['tool_cost'];
  }

  advpercent_cal() {
    let price = parseFloat(this.ToolForm.value['tool_rent_cost']);
    let adv_p = this.ToolForm.value['tool_adv_price'];
    this.adv_price = (price * adv_p) / 100;
    this.adv_price = parseFloat(this.adv_price).toFixed(2);
  }

  stock_cal() {
    let rentstock = this.ToolForm.value['tool_rent_quantity'];
    let availablequantity = this.ToolForm.value['tool_sale_quantity'];
    this.s_stock = availablequantity - rentstock;
  }

  delay_cal() {
    let price = this.ToolForm.value['tool_rent_cost'];
    let del_per = this.ToolForm.value['tool_delay_percentage'];
    this.delay_price = (price * del_per) / 100;
  }

  depost_cal() {
    let price = parseFloat(this.ToolForm.value['tool_rent_cost']);
    let depositamount = this.ToolForm.value['tool_deposit_price'];
    let dep_price = (price * depositamount) / 100
    this.dep_price = price + dep_price;
    this.dep_price = parseFloat(this.dep_price).toFixed(2);
  }

}
