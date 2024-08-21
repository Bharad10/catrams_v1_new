import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/service/user-service/user.service';
import { LightboxModule, LightboxConfig, Lightbox } from 'ngx-lightbox';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-quotation-list-module',
  templateUrl: './quotation-list-module.component.html',
  styleUrls: ['./quotation-list-module.component.css']
})
export class QuotationListModuleComponent {
    qt_list: any;
    rows = [];
    filteredRows = [];
    searchvalue : any;
    role_id: any;
    search=''
  constructor(
    private router: Router,
    private usr_ser:UserService
              ) {
                this.role_id = localStorage.getItem("us_role_id");
                this.role_id=atob(atob(this.role_id))
                if(this.role_id==1){
                  this.usr_ser.qt_list().subscribe((rdata: any) => {
                    if (rdata.ret_data == 'success') {
                    this.qt_list = rdata.result;
                     this.rows=this.qt_list;
                     this.filteredRows = this.rows;
    
                        }
                      });
                }else{
                  this.usr_ser.getquote_byroleid().subscribe((rdata: any) => {
                    if (rdata.ret_data == 'success') {
                    this.qt_list = rdata.result;
                     this.rows=this.qt_list;
                     this.filteredRows = this.rows;
    
                        }
                      });
                }
                
  }


  cols = [
    { field: 'qtm_number', title: 'Quote Request Code' },
    { field: 'serm_number', title: 'Service Request Code' },
    { field: 'cstm_name', title: 'Customer Name' },
    { field: 'us_firstname', title: 'Assignee' },
    { field: 'sm_name', title: 'Status' },
    { field: 'qtm_updated_on', title: 'Last Updated On' },
    { field: 'Action', title: 'Action' },
  ];

 editquotation(quoteid:any,srid:any) {
  // //console.log("quote id===>",quoteid);
  // quoteid = btoa(quoteid).replace(/==/g, '');;
  // srid = btoa(srid).replace(/==/g, '');;
  // //console.log("ser id===>",);
  // this.router.navigateByUrl('/quotation-create/'+srid+'/'+quoteid);
  this.router.navigateByUrl('service-request-list');

 }
 createquote(){
    this.router.navigateByUrl('quotation-create');
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
  onSearch(searchValue: string) {
    //console.log("searchvaluuuuuuuuuuuuuuuuue-->",searchValue);
    
    this.filteredRows = this.rows.filter(row => {
      // Convert each row's values to lowercase for case-insensitive search
      return Object.values(row).some(val => (val ? val.toString().toLowerCase().includes(searchValue.toLowerCase()) : false));
    });
  }
  servhist(){
    this.router.navigateByUrl('service-request-history')
  }
  servlist(){
    this.router.navigateByUrl('service-request-list');
  
  }
  sendquote(srid:any,qtm_id:any) {
    this.router.navigateByUrl('/quotation-create/' + srid + '/' + qtm_id);
  }
 
 }
 
 
 
 