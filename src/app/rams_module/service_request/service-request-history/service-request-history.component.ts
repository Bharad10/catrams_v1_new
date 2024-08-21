import { Component, OnInit } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable/public-api';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import { TranslationServiceTsService } from 'src/app/service/translation-service/translation.service.ts.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-service-request-history',
  templateUrl: './service-request-history.component.html',
  styleUrls: ['./service-request-history.component.css']
})
export class ServiceRequestHistoryComponent implements OnInit{
  hist_data: any;
  rows = [];
  filteredRows = [];
  searchvalue : any;
  result_data: any;
  role_id: any;
  loading=true;
  cols:any;
  constructor(public router:Router,
    private usr_ser:UserService,
    private translationService: TranslationServiceTsService,
    private translate: TranslateService) {
    
      this.role_id = localStorage.getItem("us_role_id");
       this.role_id=atob(atob(this.role_id))
      
      

      

    }  

    ngOnInit() {
      if(this.role_id==1){
        this.usr_ser.serv_hist().subscribe((rdata: any) => {
          if (rdata.ret_data === "success") {
            
            setTimeout(() => {
              this.result_data=rdata.result;
            this.rows=this.result_data;
            this.filteredRows = this.rows;
            this.loading=false;
          },2000);
          } 
          else{
            this.loading=false;
            
          }
        });
      }else{
        this.usr_ser.gethist_by_role().subscribe((rdata: any) => {
          if (rdata.ret_data === "success") {
            
            setTimeout(() => {
              this.result_data=rdata.result;
            this.rows=this.result_data;
            this.filteredRows = this.rows;
            this.loading=false;},2000);
          } 
          else{
            this.loading=false;
            
          }
        });
      }
      this.translate.get([
        'Service Request Code',
        'Customer Name',
        'Assignee',
        'Last Updated on',
        'Last Updated Time',
        'Status',
        'Action'
      ]).subscribe(translations => {
        this.cols = [
          { field: 'serm_number', title:translations ['Service Request Code'] },
          { field: 'cstm_name', title:translations ['Customer Name'] },
          { field: 'us_firstname', title: translations['Assignee'] },
          { field: 'serm_updatedon', title: translations['Last Updated on'] },
          { field: 'serm_updatedtime', title: translations['Last Updated Time'] },
          { field: 'sm_name', title: translations['Status'] },
          { field: 'Action', title: translations['Action'] },
        ];
      });
     
    }
   
    servq_details(id:any){
      this.router.navigateByUrl('work-card-create/'+btoa(id));
    }
    service_list(srid:any){
      this.router.navigateByUrl('service-request-details/' + (btoa(srid)));
    }
    workcard_list(srid:any){
      this.router.navigateByUrl('work-card-edit/'+btoa(srid));
    }
    quote_list(srid:any){
      this.router.navigateByUrl('service-request-details/'+btoa(srid));
    }
    invm_list(srid:any){
      this.router.navigateByUrl('service-history-details/'+btoa(srid));
    }
    
    onSearch(searchValue: string) {
      //console.log("searchvaluuuuuuuuuuuuuuuuue-->",searchValue);
      
      this.filteredRows = this.rows.filter(row => {
        // Convert each row's values to lowercase for case-insensitive search
        return Object.values(row).some(val => (val ? val.toString().toLowerCase().includes(searchValue.toLowerCase()) : false));
      });
    }
    servreqlist(){
      this.router.navigateByUrl('service-request-list');

    }
    reqcreate() {
      this.router.navigateByUrl('service-request-create');
  }
  viewquote() {
      this.router.navigateByUrl('quotation-request-list');
  }
  viewworkcard() {
      this.router.navigateByUrl('work-card-list');
  }
  viewhistory() {
      this.router.navigateByUrl('service-request-history');
  }
  viewadmin_approval() {
      this.router.navigateByUrl('admin-approval');
  }

  editworkcard(id : any) {
      this.router.navigateByUrl('work-card-edit/' + btoa(id));
  }

  

  sendquote(srid : any, qtm_id : any) {
      this.router.navigateByUrl('/quotation-create/' + srid + '/' + qtm_id);
  }
  sendquote_exp(srid : any, qtm_id : any) {
      this.router.navigateByUrl('/quotation-edit/' + srid + '/' + qtm_id);
  }

}
