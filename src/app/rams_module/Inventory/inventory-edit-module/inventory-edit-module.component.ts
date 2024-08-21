import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-edit-module',
  templateUrl: './inventory-edit-module.component.html',
  styleUrls: ['./inventory-edit-module.component.css']
})
export class InventoryEditModuleComponent implements OnInit{
  tr_id: any;
  list: any;
  rows: any;
  ToolForm: FormGroup;
  s_stock: any;
  r_stock: any;
  tool_id:any;
  constructor(
    private fb: FormBuilder,
    private usr_ser:UserService,
    private router:Router,
    private activerouter: ActivatedRoute,)
{
  this.ToolForm = this.fb.group({
    tool_name: '',
    tool_total_quantity: '',
    tool_sale_quantity: '',
    tool_rent_quantity: '',
    tool_rent_id:"",
});
}
ngOnInit() {
  const encodedRoleId = this.activerouter.snapshot.paramMap.get('id')!;
    this.tool_id = atob(encodedRoleId);
    let data={
     'tool_id':this.tool_id
    }
    this.usr_ser.tool_track_list(data).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        setTimeout(() => {
          this.list=rdata.tool_details;
          this.rows=this.list; 
          }, 850);

          this.ToolForm.setValue({
            tool_name: rdata.tool_details[0].tool_name,
            tool_total_quantity: rdata.tool_details[0].tool_total_quantity,
            tool_sale_quantity: rdata.tool_details[0].tool_sale_quantity,
            tool_rent_quantity: rdata.tool_details[0].tool_rent_quantity,
            tool_rent_id: rdata.tool_details[0].tool_rent_id,
          });
          this.s_stock= rdata.tool_details[0].tool_sale_quantity;
          this.r_stock=rdata.tool_details[0].tool_rent_quantity;
        
      }else{
        let no_data_msg=rdata.Message;
      }
  });



}
cols = [
  { field: 'trk_quant', title: 'Tool Quantity'},
  { field: 'trk_type', title: 'Type'},
  { field: 'trk_updated_on', title: 'Updated On'},
  { field: 'cstm_name', title: 'Customer Name'},
];

Inspectionlist(){
  this.router.navigateByUrl('inventory-list');
}

stock_cal(){
  let tool_rent_quantity=this.ToolForm.value['tool_rent_quantity'];
  let tool_total_quantity=this.ToolForm.value['tool_total_quantity'];
  this.s_stock=tool_total_quantity-tool_rent_quantity; 
}
cal_stock(){
  let tool_sale_quantity=this.ToolForm.value['tool_sale_quantity'];
  let tool_total_quantity=this.ToolForm.value['tool_total_quantity'];
  this.r_stock=tool_total_quantity-tool_sale_quantity; 
}
updatestock(){

  this.ToolForm.value['tool_sale_quantity']= this.s_stock;
  this.ToolForm.value['tool_rent_quantity']= this.r_stock;
  let tooldata ={
    'data':this.ToolForm.value,
    'tool_id':this.tool_id
  }
  this.usr_ser.stock_update(tooldata).subscribe((rdata: any) => {
    if (rdata.ret_data === "success") {
      this.showMessage('Tool Created.', 'success');
        setTimeout(() => this.router.navigate(['/inventory-list']), 500);
    } 
    else{
      this.showMessage(rdata.Message, 'error');
    }
  });
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
