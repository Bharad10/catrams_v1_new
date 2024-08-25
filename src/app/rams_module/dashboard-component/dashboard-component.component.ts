
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/service/user-service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-dashboard-component',
    templateUrl: './dashboard-component.component.html',
    styleUrls: ['./dashboard-component.component.css'],
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class DashboardComponentComponent implements OnInit {
   
    store: any;
    revenueChart: any;
    salesByCategory: any;
    dailySalestotal: any;
    dailySalesopen:any;
    dailySalesclosed:any;
    dailySalesdue:any;
    dailySalesrent:any
    totalOrders: any;

    totalVisit: any;
    paidVisit: any;
    uniqueVisitor: any;
    followers: any;
    referral: any;
    engagement: any;
    isLoading = true;
    total_tickets: any;
    total_closed: any;
    total_open: any;
    user_list: any;
    tool_total: any;
    service_total: any;
    tool_closed: any;
    service_closed: any;
    tool_open: any;
    service_open: any;
    tool_pay_pend:any;
    serv_pay_pend:any;  
    total_pay_pending:any; 
    total_pending:any;
    tool_pending:any;
    serv_pending:any;        
    open_tickets: any;
    holded_tickets: any;
    serm_hold: any;
    tool_hold: any;
    tool_Data: any=[];
    rows:any=[];
    upd_msg:boolean=false;
    search = '';
    def_tool:boolean=false;
    
    defaultParams = {
        id: null,
        title: '',
        start: '',
        end: '',
        description: '',
        type: 'primary',
    };
    params!: FormGroup;
    minStartDate: any = '';
    minEndDate: any = '';

    events: any = [];
    calendarOptions: any;
    cols:any;
    constructor(public storeData: Store<any>,
        private usr_serv:UserService,
        private router:Router,
        public fb: FormBuilder,
        private translate: TranslateService) {
           

        this.isLoading = false;
        

        
    }

    ngOnInit(): void {

        this.usr_serv.fetch_total_hist().subscribe((rdata: any) => {
            if (rdata.ret_data == "success") {
                this.user_list=rdata.user_list;
                this.total_tickets = rdata.user_list.total_tickets;
                this.total_closed = rdata.user_list.total_closed;
                this.total_open = rdata.user_list.total_open;
                this.tool_total = rdata.user_list.tool_total;
                this.service_total = rdata.user_list.service_total;
                this.tool_closed = rdata.user_list.tool_closed;
                this.service_closed = rdata.user_list.service_closed;
                this.tool_open = rdata.user_list.tool_open;
                this.service_open = rdata.user_list.service_open;
                this.tool_pay_pend = rdata.user_list.tool_pay_pend;
                this.serv_pay_pend = rdata.user_list.serv_pay_pend;
                this.total_pay_pending=this.serv_pay_pend+this.tool_pay_pend;
                this.serv_pending = rdata.user_list.inprogress_service;
                this.tool_pending = rdata.user_list.inprogress_tool;
                this.total_pending = rdata.user_list.inprogress_total;
                this.open_tickets=rdata.user_list.open_tickets;
                this.holded_tickets=rdata.user_list.holded_tickets;
                this.serm_hold=rdata.user_list.serm_hold;
                this.tool_hold=rdata.user_list.tool_hold;
                this.tool_Data=rdata.user_list.due_array;
                this.rows = this.tool_Data.length > 0 ? this.tool_Data.sort((a: any, b: any) => b.due_days - a.due_days) : [];
                this.upd_msg=true;
                this.def_tool=this.user_list?true:false;
            }else{
                this.user_list=rdata.code;
            }
        });

        this.usr_serv.check_reopen_workcard().subscribe((rdata: any) => {});
        
    }

  
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                const hasChangeTheme = this.store?.theme !== d?.theme;
                const hasChangeLayout = this.store?.layout !== d?.layout;
                const hasChangeMenu = this.store?.menu !== d?.menu;
                const hasChangeSidebar = this.store?.sidebar !== d?.sidebar;

                this.store = d;

                if (hasChangeTheme || hasChangeLayout || hasChangeMenu || hasChangeSidebar) {
                    if (this.isLoading || hasChangeTheme) {
                        this.initCharts(); //init charts
                    } else {
                        setTimeout(() => {
                            this.initCharts(); // refresh charts
                        }, 300);
                    }
                }
            });
    }

    initCharts() {
        const isDark = this.store.theme === 'dark' || this.store.isDarkMode ? true : false;
        const isRtl = this.store.rtlClass === 'rtl' ? true : false;

       

        // sales by category
        this.salesByCategory = {

            chart: {
                type: 'donut',
                height: 200,
                fontFamily: 'Nunito, sans-serif',
            },
            fill: {
                type: "gradient"
              },
            dataLabels: {
                enabled: false,
            },

            stroke: {
                show: true,
                width: 5,
                colors:  '#fff',
            },

            colors: 
             [
                '#ffd46c'
                ,'#d15478'
                ,'#4d7a4d'
            ],
            
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
                                fontSize: '12px',
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

            labels: ['In Progress', 'Open', 'Closed'],

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

            series: [this.total_pending,this.total_open, this.total_closed],
            
            
            
        };

        this.followers = {
            chart: {
                height: 250,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: false,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#4361ee', '#00ab55'],
            grid: {
                padding: {
                    top: 5,
                },
            },
            yaxis: {
                show: false,
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: (val: any) => {
                            return '';
                        },
                    },
                },
            },
            fill: isDark
                ? null
                : {
                      type: 'gradient',
                      gradient: {
                          type: 'vertical',
                          shadeIntensity: 1,
                          inverseColors: false,
                          opacityFrom: 0.3,
                          opacityTo: 0.05,
                          stops: [100, 100],
                      },
                  },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '12px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 80,
                offsetY: 10,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '75%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '18px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '18px',
                                color: isDark ? '#bfc9d4' : undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '18px',
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
            series: [
                {
                    name: 'Total Service Request',
                    data:[
                        this.user_list.monthly_data[0],
                        this.user_list.monthly_data[1],
                        this.user_list.monthly_data[2],
                        this.user_list.monthly_data[3],
                        this.user_list.monthly_data[4],
                        this.user_list.monthly_data[5],
                        this.user_list.monthly_data[6],
                    ]
                },
                {
                    name: 'Completed Service Request',
                    data:[
                        this.user_list.monthly_cmpl_data[0],
                        this.user_list.monthly_cmpl_data[1],
                        this.user_list.monthly_cmpl_data[2],
                        this.user_list.monthly_cmpl_data[3],
                        this.user_list.monthly_cmpl_data[4],
                        this.user_list.monthly_cmpl_data[5],
                        this.user_list.monthly_cmpl_data[6],
                    ]
                },
            ],
        };

    }

    servreq(srid:any){
        this.router.navigateByUrl('service-request-details/' + (btoa(srid)));
    }
    toolreq(){
        this.router.navigateByUrl('tool-request-list');
    }
    tooledit(id: any) {
        this.router.navigateByUrl('tool-request-edit/' + (btoa(id)));
    }
    
  
   

    showMessage(msg = '', type = 'success') {
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





