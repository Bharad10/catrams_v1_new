import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import Swal from 'sweetalert2';
import {UserService} from 'src/app/service/user-service/user.service';
import {LightboxModule, LightboxConfig, Lightbox} from 'ngx-lightbox';
import {ActivatedRoute, RouteReuseStrategy, Router} from '@angular/router';
import {NgModel} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';


@Component({selector: 'app-work-card-list', templateUrl: './work-card-list.component.html', styleUrls: ['./work-card-list.component.css']})
export class WorkCardListComponent implements OnInit {
    wk_list : any;
    rows = [];
    access_data : any;
    userfeatures : any;
    permittedaction : any;
    role_id : any;
    permission_Denied = 0;
    search = '';
    cols : any = [];
    loading = true;
    nrq_flag:boolean=false;
    open_works:any;
    constructor(private router : Router, private usr_ser : UserService, private translate : TranslateService) {
        this.access_data = localStorage.getItem("access_data");

    }
    ngOnInit() {
        this.role_id = localStorage.getItem("us_role_id");
        this.userfeatures = JSON.parse(atob(atob(this.access_data)));
        this.userfeatures.forEach((element : any) => {
            element['ft_id'] == 4 ? this.permittedaction = element['actions'] : "";
        });
        if (this.permittedaction.includes('5')) {
            const role_id = atob(atob(this.role_id))
            if (role_id == '1') {
                this.usr_ser.wk_list().subscribe((rdata : any) => {
                    if (rdata.ret_data == 'success') {
                        this.wk_list = rdata.result;
                        this.rows = this.wk_list;
                        this.open_works=rdata.open_works;
                        this.nrq_flag=(this.open_works!=0)?true:false;
                        setTimeout(() => {
                            this.loading = false;
                        }, 1500);

                        this.ready_data(1)
                        

                    } else {
                        setTimeout(() => {
                            this.loading = false;
                        }, 1500);

                    }
                });
            } else {
                this.usr_ser.getwork_by_role().subscribe((rdata : any) => {
                    if (rdata.ret_data == 'success') {
                        this.wk_list = rdata.result;
                        this.open_works=rdata.open_works;
                        this.nrq_flag=(this.open_works!=0)?true:false;
                        this.rows = this.wk_list;
                        this.ready_data(2)
                        setTimeout(() => {
                            this.loading = false;
                        }, 1500);

                    } else {
                        setTimeout(() => {
                            this.loading = false;
                        }, 1500);

                    }
                });
            }
        } else {}

    }

    ready_data(id : any) {
        if (id == 1) {
            this.translate.get([
                'Service Request Code',
                'Customer Name',
                'Assigned to',
                'Status',
                'Last Updated on',
                'Last Updated Time',
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
                        field: 'us_firstname',
                        title: translations['Assigned to']
                    },
                    {
                        field: 'sm_name',
                        title: translations['Status']
                    }, {
                        field: 'serm_updatedon',
                        title: translations['Last Updated on']
                    }, {
                        field: 'serm_updatedtime',
                        title: translations['Last Updated Time']
                    }, {
                        field: 'Action',
                        title: translations['Action']
                    },
                ];
            });
        } else {

            this.translate.get([
                'Service Request Code',
                'Customer Name',
                'Assigned By',
                'Status',
                'Last Updated on',
                'Last Updated Time',
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
                        field: 'us_firstname',
                        title: translations['Assigned By']
                    },
                    {
                        field: 'sm_name',
                        title: translations['Status']
                    }, {
                        field: 'serm_updatedon',
                        title: translations['Last Updated on']
                    }, {
                        field: 'serm_updatedtime',
                        title: translations['Last Updated Time']
                    }, {
                        field: 'Action',
                        title: translations['Action']
                    },
                ];
            });

        }


    }


    // acceptworkcard(id:any){
    // let data=btoa(id)
    // this.usr_ser.wk_details(data).subscribe((rdata: any) => {
    //     if (rdata.ret_data == 'success') {
    //     this.showMessage('Work card created.', 'success');
    //    this.router.navigateByUrl('work-card-edit/'+btoa(id));
    //         }
    //       });
    // }


    editworkcard(id : any) {

        if (this.permittedaction.includes('2')) {
            this.router.navigateByUrl('work-card-edit/' + btoa(id));
        } else {
            this.permission_Denied = 1;
            this.showMessage("Permission Denied!!!!", 'error')
        }

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
    servlist() {
        this.router.navigateByUrl('/service-request-list');
    }

}
