import {Component, OnInit} from '@angular/core';
import {colDef} from '@bhplugin/ng-datatable/public-api';
import {Router} from '@angular/router';
import {UserService} from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';
import {SystemService} from 'src/app/service/system/system.service';
import {TranslationServiceTsService} from 'src/app/service/translation-service/translation.service.ts.service';
import {TranslateService} from '@ngx-translate/core';
@Component({selector: 'app-service-req-list', templateUrl: './service-req-list.component.html', styleUrls: ['./service-req-list.component.css']})
export class ServiceReqListComponent implements OnInit {
    serv_list : any;
    lists:any[] = [];
    cols : any[]=[];
    access_data : any;
    userfeatures : any;
    permittedaction : any;
    permission_Denied = 0;
    role_id : any;
    loading = true;
    search = '';

    formatDate(date: any) {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    }

    nrq_flag:boolean=false;
    open_request:any;
    constructor(public router : Router, private usr_ser : UserService, private systemService : SystemService, private translationService : TranslationServiceTsService, private translate : TranslateService) {
        this.access_data = localStorage.getItem("access_data");
        this.role_id = localStorage.getItem("us_role_id");
        this.userfeatures = JSON.parse(atob(atob(this.access_data)));

        this.userfeatures.length > 0 ? this.userfeatures.forEach((element
        : any) => {
            element['ft_id'] == 3 ? this.permittedaction = element['actions'] : "";
        }) : "";
        this.translate.get([
            'Service Request Code',
            'Customer Name',
            'Last Updated on',
            'Last Updated Time',
            'Status',
            'Action'
        ]).subscribe(translations => {
            this.cols = [
                {
                    field: 'serm_number',
                    title: translations['Service Request Code']
                },
                {
                    field: 'cstm_name',
                    title: translations['Customer Name']
                },
                {
                    field: 'serm_updatedon',
                    title: translations['Last Updated on']
                },
                {
                    field: 'time',
                    title: translations['Last Updated Time']
                }, {
                    field: 'sm_name',
                    title: translations['Status']
                }, {
                    field: 'Action',
                    title: translations['Action']
                },
            ];
        });

    }


    ngOnInit() {
        
        if (this.permittedaction && this.permittedaction.includes('5')) {
            const role_id = atob(atob(this.role_id))


            if (role_id == '1') {
                this.usr_ser.service_request_list().subscribe((rdata : any) => {
                    if (rdata.ret_data === "success") {
                        this.lists = rdata.result;
                        this.serv_list = rdata.result;
                        this.open_request=rdata.open_request
                        this.nrq_flag=(this.open_request!=0)?true:false;
                        this.loading = false;

                    } else {
                        this.loading = false;
                        this.serv_list = 6;

                    }
                });

            } else {
                this.usr_ser.getreq_by_role().subscribe((rdata : any) => {
                    if (rdata.ret_data === "success") {
                        setTimeout(() => {
                            this.serv_list = rdata.result;
                            this.lists = this.serv_list;
                            this.loading = false;
                        }, 800);
                    } else {
                        this.loading = false;
                        this.serv_list = 6;

                    }
                });
            }

        } else {
            this.permission_Denied = 1;
        }
    }


    servq_details(srid : any) {
        if (this.permittedaction.includes('2')) {
            this.router.navigateByUrl('service-request-details/' + (
                btoa(srid)
            ));
        } else {
            this.permission_Denied = 1;
            this.showMessage("Permission Denied!!!!", 'error')
        }

    }
    histdetails(id : any) {
        if (this.permittedaction.includes('2')) {
            this.router.navigateByUrl('work-card-create/' + (
                btoa(id)
            ));
        } else {
            this.permission_Denied = 1;
            this.showMessage("Permission Denied!!!!", 'error')
        }

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

    service_list(srid : any) {
        this.router.navigateByUrl('service-request-details/' + (
            btoa(srid)
        ));
    }
    workcard_list(srid : any) {
        this.router.navigateByUrl('work-card-edit/' + btoa(srid));
    }
    quote_list(srid : any) {
        this.router.navigateByUrl('service-request-details/' + btoa(srid));
    }
    invm_list(srid : any) {
        this.router.navigateByUrl('service-history-details/' + btoa(srid));
    }

    sendquote(srid : any, qtm_id : any) {
        this.router.navigateByUrl('/quotation-create/' + srid + '/' + qtm_id);
    }
    sendquote_exp(srid : any, qtm_id : any) {
        this.router.navigateByUrl('/quotation-edit/' + srid + '/' + qtm_id);
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

    logout() {

        this.systemService.logout().subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                localStorage.clear();
                this.router.navigateByUrl('/');
            }
        });

    }


}
