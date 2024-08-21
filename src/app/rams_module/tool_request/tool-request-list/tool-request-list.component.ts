import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgApexchartsModule } from 'ng-apexcharts/public_api';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user-service/user.service';
import { Store } from '@ngrx/store';
import { ChartComponent } from "ng-apexcharts";
import { TranslationServiceTsService } from 'src/app/service/translation-service/translation.service.ts.service';
import { TranslateService } from '@ngx-translate/core';
import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart,
    ApexFill,
    ApexDataLabels,
    ApexLegend
  } from "ng-apexcharts";
import { environment } from 'src/environments/environment';

@Component({
    moduleId: module.id,
    selector: 'app-tool-request-list',
    templateUrl: './tool-request-list.component.html',
    styleUrls: ['./tool-request-list.component.css'],
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],

})
export class ToolRequestListComponent implements OnInit{


    rows:any= [];
    requests_list: any;
    store: any;
    salesByCategory: any;
    tool_open: any;
    pending: any;
    tool_pay_pend: any;
    access_data: any;
    userfeatures:any;
    permittedaction:any;
    permission_Denied=0;
    search :any;
    loading=true;
    cols :any=[];
    r_time=environment.reload_time
    nrq_flag:Boolean=false
    
    constructor(private router: Router,
        private usr_serv: UserService,
        public storeData: Store<any>,
        private translationService: TranslationServiceTsService,
        private translate: TranslateService) {
            this.access_data = localStorage.getItem("access_data");
        
    }

    loadActiveRequestGraph() {

        this.salesByCategory = {
            chart: {
                type: 'donut',
                height: 500,
                fontFamily: 'system-ui',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
            },
            fill: {
                type: "gradient"
              },
            colors:  ['#176B87', '#004225','#E3651D'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
                color:  undefined,
                
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color:  undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total Tickets',
                                color: '#888ea8',
                                fontSize: '20px',
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: ['In Progress', 'Open Tickets','Pending Payments'],
            series: [this.pending , this.tool_open,this.tool_pay_pend],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },

        };
    }
    ngOnInit() {
        this.translate.get([
            'Tool Request Code',
            'Customer Name',
            'Tool Name',
            'Last Updated On',
            'Last Updated Time',
            'Status',
            'Action'
          ]).subscribe(translations => {
            this.cols = [
         
              { field: 'tldt_number', title:translations ['Tool Request Code']  },
              { field: 'cstm_name', title: translations ['Customer Name'] },
              { field: 'tool_name', title: translations ['Tool Name'] },
              { field: 'tldt_updated_on', title: translations ['Last Updated On'] },
              { field: 'time', title: translations ['Last Updated Time'] },
              { field: 'tool_req_status', title: translations ['Status'] },
              { field: 'Action', title: translations ['Action'] },
            ];
          });
        this.userfeatures=JSON.parse(atob(atob(this.access_data)));
    this.userfeatures.forEach((element: any) => {element['ft_id']==3?this.permittedaction=element['actions']:"";});
    if(this.permittedaction.includes('5')){
        this.fetch_list();

        
        // setInterval(() => {
        //     this.fetch_list();
        // }, this.r_time);

    }else{
            this.permission_Denied=1;
        }
    }

    fetch_list(){

        this.loading = true;
        let data = {
            'cstm_id': ''
        }
        this.usr_serv.tool_req_list(data).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                
                
                setTimeout(() => {
                this.requests_list = rdata.result;
                this.rows = this.requests_list;
               
               this.tool_open=rdata.count_list.tool_open;
               this.nrq_flag=(this.tool_open!=0)?true:false;
               this.tool_pay_pend=rdata.count_list.tool_pay_pend;
               this.pending=rdata.count_list.pending_tool;
                this.loadActiveRequestGraph();
                  }, 550); 
            }
            
             else {
                
            }
            setTimeout(() => {
                this.loading = false;
                  }, 550); 
        });
        
    }
   
    tooledit(id: any) {
        this.router.navigateByUrl('tool-request-edit/' + (btoa(id)));
    }


   

    


    viewinspection_list(){
        if(this.permittedaction.includes('2')){
            this.router.navigateByUrl('tool-inspection-list')
        }else{
          this.permission_Denied=1;
          this.showMessage("Permission Denied!!!!",'error')
        }
        
    }
    wk_det(id:any){
        this.router.navigateByUrl('work-card-create/' + (btoa(id)));
    }

    tool_list(){
        window.location.reload();
    }
    viewadmin_approval(){
        
        if(this.permittedaction.includes('2')){
            this.router.navigateByUrl('admin-approval')
        }else{
          this.permission_Denied=1;
          this.showMessage("Permission Denied!!!!",'error')
        }
    }
    viewhistory(){
        
        if(this.permittedaction.includes('2')){
            this.router.navigateByUrl('tool-request-history')
        }else{
          this.permission_Denied=1;
          this.showMessage("Permission Denied!!!!",'error')
        }

    }
    viewpending(){
        if(this.permittedaction.includes('2')){
            this.router.navigateByUrl('tool-request-list')
        }else{
          this.permission_Denied=1;
          this.showMessage("Permission Denied!!!!",'error')
        }
    }
    toolsale(){
        if(this.permittedaction.includes('2')){
            this.router.navigateByUrl('tool-sale')
        }else{
          this.permission_Denied=1;
          this.showMessage("Permission Denied!!!!",'error')
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


}