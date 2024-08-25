import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/service/system/system.service';
import { UserService } from 'src/app/service/user-service/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-admin-approval',
    templateUrl: './admin-approval.component.html',
    styleUrls: ['./admin-approval.component.css'],
})
export class AdminApprovalComponent {
    tab17: string = 'request';
    tab18: string = 'home';
    rows = [];
    histrows = [];

    approval_list: any;
    tool_price = 0.0;
    filteredRows = [];
    filteredRows2 = [];
    searchvalue: any;
    baseurl = environment.base_img_url;
    quantity: any;
    services_approval: any;
    srows: any;
    pending = 0;
    search = '';
    loading1 = true;
    loading2 = true;
    cols: any = [];
    service: any = [];
    unHoldFlag: boolean = false;
    holdFlag: boolean = false;

    constructor(
        public fb: FormBuilder,
        private systemService: SystemService,
        private translate: TranslateService,
        public router: Router,
        private usr_ser: UserService,
        private _lightbox: Lightbox,
        private _lightboxConfig: LightboxConfig
    ) {
        this.translate.get(['Item', 'Request', 'Last Updated on', 'Last Updated time', 'Requested by', 'Status', 'Action']).subscribe((translations) => {
            this.cols = [
                { field: 'tool_name', title: translations['Item'] },
                { field: 'number', title: translations['Request'] },
                { field: 'am_updatedon_date', title: translations['Last Updated on'] },
                { field: 'am_updatedon_time', title: translations['Last Updated time'] },
                { field: 'cstm_name', title: translations['Requested by'] },
                { field: 'Status', title: translations['Status'] },
                { field: 'Action', title: translations['Action'] },
            ];
        });

        this.service = [
            { field: 'serm_number', title: 'Request ID' },
            { field: 'requested_by', title: 'Requested By' },
            { field: 'am_reason', title: 'Reason' },
            { field: 'Status', title: 'Status' },
            { field: 'Action', title: 'Action' },
        ];

        this.translate.get(['Request ID', 'Requested By', 'Reason', 'Status', 'Requested by', 'Status', 'Action']).subscribe((translations) => {
            this.service = [
                { field: 'serm_number', title: translations['Request ID'] },
                { field: 'requested_by', title: translations['Requested By'] },
                { field: 'am_reason', title: translations['Reason'] },
                { field: 'Status', title: translations['Status'] },
                { field: 'Action', title: translations['Action'] },
            ];
        });

        this.systemService.getapproval_list().subscribe((rdata: any) => {
            _lightboxConfig.enableTransition = false;
            _lightboxConfig.wrapAround = true;
            _lightboxConfig.positionFromTop = 0;
            _lightboxConfig.disableScrolling = true;
            if (rdata.ret_data == 'success') {
                    this.approval_list = rdata.approval_list;
                    this.rows = this.approval_list;
                    this.filteredRows = this.rows;
                    this.loading1 = false;
            }
        });
    }

    request_update(id: any, status: any, tldet_id: any) {
        let data = {
            am_id: id,
            status: status,
            tldet_id: tldet_id,
            tool_price: this.tool_price,
        };

        this.systemService.update_req(data).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                if (status == 1) {
                    this.showMessage(' success.', 'success');
                } 
                this.router.navigate(['tool-request-list'])
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
    onSearch(searchValue: string) {
        this.filteredRows = this.rows.filter((row) => {
            // Convert each row's values to lowercase for case-insensitive search
            return Object.values(row).some((val) => (val ? val.toString().toLowerCase().includes(searchValue.toLowerCase()) : false));
        });
    }
    onSearchhist(searchValue: string) {
        this.filteredRows2 = this.srows.filter((srow: { [s: string]: unknown } | ArrayLike<unknown>) => {
            // Convert each row's values to lowercase for case-insensitive search
            return Object.values(srow).some((val) => (val ? val.toString().toLowerCase().includes(searchValue.toLowerCase()) : false));
        });
    }

    holdrequest_update(id: any, status: any, tldet_id: any, type: any) {
        if (type == 0) {
            if (status == 2) {
                let data = {
                    am_id: id,
                    status: status,
                    rq_id: tldet_id,
                    type: type,
                };
                this.systemService.update_hold_req(data).subscribe((rdata: any) => {
                    if (rdata.ret_data == 'success') {
                        this.showMessage(' success.', 'success');
                    } this.router.navigate(['tool-request-list'])
                });
            } else {
                this.router.navigateByUrl('tool-request-edit/' + btoa(tldet_id));
            }
        }
    }

    update_amount(am_id: any, tldet_id: any, rpt_id: any, type: any) {
        if (type == 0) {
            let data = {
                am_id: am_id,
                tldet_id: tldet_id,
                rpt_id: rpt_id,
                type: type,
            };
            this.systemService.damagedtoolreq_updt(data).subscribe((rdata: any) => {
                if (rdata.ret_data == 'success') {
                    this.showMessage(' success.', 'success');
                    this.router.navigate(['tool-request-list']);
                } else {
                    this.showMessage(' Fail', 'error');
                    this.router.navigate(['admin-approval']);
                }
            });
        } else {
            let data = {
                am_id: am_id,
                tldet_id: tldet_id,
                type: type,
                rpt_id: rpt_id,
            };

            this.systemService.damagedtoolreq_updt(data).subscribe((rdata: any) => {
                if (rdata.ret_data == 'success') {
                    this.showMessage(' success.', 'success');
                    this.router.navigate(['tool-request-list']);
                } else {
                    this.showMessage(' Fail', 'error');
                    this.router.navigate(['admin-approval']);
                }
            });
        }
    }

    app_service() {
        this.systemService.app_service().subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                    this.services_approval = rdata.approval_list;
                    this.srows = this.services_approval;
                    this.filteredRows2 = this.srows;
                    
            } this.loading2 = false;
        });
    }

    workcard_module(id: any) {
        this.router.navigateByUrl('work-card-edit/' + btoa(id));
    }
    request_rejected(serm_id: any, am_id: any) {
        let data = {
            am_id: am_id,
            serm_id: serm_id,
        };
        this.systemService.request_rejected_hold(data).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage(' success.', 'success');
                this.router.navigate(['tool-request-list']);
            } else {
                this.showMessage(' Fail', 'error');
                this.router.navigate(['admin-approval']);
            }
        });
    }
    sale_rejected(am_id: any, order_id: any, type: any) {
        let data = {
            am_id: am_id,
            order_id: order_id,
            type: type,
        };
        this.systemService.saledamaged_update(data).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage(' success.', 'success');
                this.router.navigate(['tool-request-list']);
            } else {
                this.showMessage(' Fail', 'error');
                this.router.navigate(['admin-approval']);
            }
        });
    }

    workcardhold(serm_id: any, amid: any, hold_reason: any) {
        this.holdFlag = true;
        let data = {
            serm_id: serm_id,
            sitem_hold_reason: hold_reason,
            am_id: amid,
        };
        this.usr_ser.hold_workcard(data).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('WorkCard is in Hold', 'success');
                window.location.reload();
            } else {
                this.showMessage('Error', 'error');
                
            }
            this.holdFlag = false;
        });
    }

    workcard_unhold(serm_id: any, am_id: any) {
        this.unHoldFlag = true;
        let data = {
            serm_id: serm_id,
            flag: 1,
            am_id: am_id,
        };
        this.usr_ser.workcard_unhold(data).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('WorkCard Resumed', 'success');
                window.location.reload();
            } else {
                this.showMessage('Error', 'error');
                
            }
            this.unHoldFlag = false;
        });
    }

    jobhold(sid: any, serm_id: any, amid: any, reason: any) {
        let data = {
            serm_id: serm_id,
            service: sid,
            am_id: amid,
            sitem_hold_reason: reason,
        };

        this.usr_ser.hold_workcard(data).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('WorkCard is in Hold', 'success');
                window.location.reload();
            } else {
                this.showMessage('Error', 'error');
            }
        });
    }

    job_unhold(serm_id: any, am_id: any, sitem_id: any) {
        let data = {
            serm_id: serm_id,
            am_id: am_id,
            service: sitem_id,
        };

        this.usr_ser.workcard_unhold(data).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('WorkCard Resumed', 'success');
                window.location.reload();
            } else {
                this.showMessage('Error', 'error');
            }
        });
    }

    reject_request(pm_id: any, cstm_id: any, am_id: any, cp_id: any) {
        let data = {
            pm_id: pm_id,
            cstm_id: cstm_id,
            am_id: am_id,
            cp_id: cp_id,
            flag: 1,
        };

        this.usr_ser.premium_approval(data).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('Rejected', 'success');
                window.location.reload();
            } else {
                this.showMessage('Error', 'error');
            }
        });
    }

    accept_request(pm_id: any, cstm_id: any, am_id: any, cp_id: any) {
        let data = {
            pm_id: pm_id,
            cstm_id: cstm_id,
            am_id: am_id,
            cp_id: cp_id,
            flag: 0,
        };

        this.usr_ser.premium_approval(data).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('Approved', 'success');
                window.location.reload();
            } else {
                this.showMessage('Error', 'error');
            }
        });
    }
}
