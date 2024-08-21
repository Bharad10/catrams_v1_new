import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';


@Component({
  selector: 'app-tool-inspection-list',
  templateUrl: './tool-inspection-list.component.html',
  styleUrls: ['./tool-inspection-list.component.css']
})
export class ToolInspectionListComponent implements OnInit {
  list: any;
  rows = [];
  constructor(private router: Router,
    private usr_ser:UserService) {

    
  }
  cols = [
    { field: 'tldt_number', title: 'Request Code' },
    { field: 'tldt_tool_duration', title: 'Rented Days' },
    { field: 'tldt_tool_quant', title: 'Tool Quantity' },
    { field: 'tldt_updated_on', title: 'Last Updated on' },
    { field: 'tool_req_status', title: 'Status' },
    { field: 'Action', title: 'Action' },
];
 

 ngOnInit() {
  this.usr_ser.fetch_inspection_list().subscribe((rdata: any) => {
    if (rdata.ret_data == 'success') {
      setTimeout(() => {
        this.list=rdata.inspection_list;
        this.rows=this.list; 
        }, 550);  
    }else{
      let no_data_msg=rdata.Message;
      this.list = rdata.code;
    }
}); 




}


 edit(id:any) {
    
    
  this.router.navigateByUrl('tool-inspection-check/' + (btoa(id)));
 }
 toolrequestlist(){
  this.router.navigateByUrl('tool-request-list');

 }
 
 }


