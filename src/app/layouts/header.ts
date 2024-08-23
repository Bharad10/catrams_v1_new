import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from '../service/app.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SystemService } from '../service/system/system.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import Swal from 'sweetalert2';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { environment } from 'src/environments/environment';

@Component({
    moduleId: module.id,
    selector: 'header',
    templateUrl: './header.html',
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class HeaderComponent {
    store: any;
    msg: any;
    search = false;
    use_det: any;
    us_id: any;
    user_name: any;
    user_email: any;
    messages: any;
    notification: any;
    notcount: any;
    chat = 'Chat';
    service = 'Service';
    calender = 'Calender';
    languages = [
        { id: 1, name: 'English', code: 'en' },
        { id: 2, name: 'Arabic', code: 'ae' },
    ];

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
    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
        private appSetting: AppService,
        private sanitizer: DomSanitizer,
        private systemService: SystemService,
        private fb: FormBuilder
    ) {
        this.user_name = localStorage.getItem('us_firstname');
        this.user_name = this.user_name ? atob(atob(this.user_name)) : '';
        this.user_email = localStorage.getItem('us_email');
        this.user_email = this.user_email ? atob(atob(this.user_email)) : '';
        this.systemService.get_userdet().subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                //this.use_det=rdata.us_data
                this.us_id = rdata.us_data.us_id;
            }
        });
        this.usr_notification();
    }

    usr_notification() {
        this.systemService.get_notification().subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                this.notification = rdata.notifications;
                this.notcount = rdata.notif_len;

                console.log(' this.notification', this.notification);
                if (this.notification.length > 0 && this.notification[0]['nt_deleteflag'] == '0') {
                    this.notification_alert(this.notification[0]['nt_content']);
                }
            } else if (rdata.ret_data == 'fail') {
                this.notification = [];
                this.notcount = 0;
            }
        });
    }

    clear_all_notif() {
        let data = {
            notif_data: this.notification,
        };

        this.systemService.clear_us_notif(data).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                this.notification = [];
            } else {
            }
        });
    }

    hard_refresh() {
        window.location.reload();
    }

    ngOnInit() {
        this.setActiveDropdown();
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.setActiveDropdown();
            }
        });
    }
    removeMessage(msgId: any) {
        let data = {
            nt_id: msgId,
        };

        this.systemService.updatenotification(data).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                this.notification = this.notification.filter((msg: any) => {
                    return msg.nt_id != rdata.nt_id;
                });
            }
        });
    }

    deleteMessage(msgId: any) {
        let data = {
            nt_id: msgId,
        };

        this.systemService.deletenotification(data).subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                this.notification = this.notification.filter((msg: any) => {
                    return msg.nt_id != rdata.nt_id;
                });
            }
        });
    }

    removeNotification(id: any) {}

    chatrouter() {
        this.router.navigateByUrl('chat-home');
    }
    create_Service_Req() {
        this.router.navigateByUrl('service-request-create');
    }
    setActiveDropdown() {
        const selector = document.querySelector('ul.horizontal-menu a[routerLink="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }

    changeLanguage(item: any) {
        if (item.id == 2) {
            localStorage.setItem('rtlClass', 'rtl');
            localStorage.setItem('i18n_locale', 'ae');
        } else {
            localStorage.setItem('rtlClass', 'ltr');
            localStorage.setItem('i18n_locale', 'en');
        }
        window.location.reload();
    }

    logout() {
        this.systemService.logout().subscribe((rdata: any) => {
            if (rdata.ret_data == 'success') {
                localStorage.clear();
                this.router.navigateByUrl('/');
            }
        });
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

    show_cust_alert() {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then((result) => {
            if (result.value) {
                this.clear_all_notif();
                this.showMessage('Notifications cleared', 'success');
            }
        });
    }

    notification_alert(msg: any) {
        const position = 'bottom-end',
            showCloseButton = true,
            duration = 3000,
            color = 'info';
        const toast = Swal.mixin({
            toast: true,
            position: <any>(position || 'bottom-start'),
            showConfirmButton: false,
            timer: duration,
            showCloseButton: showCloseButton,
            customClass: {
                popup: `color-${color}`,
            },
            target: document.getElementById(color + '-toast') || 'body',
        });
        toast.fire({
            title: msg,
        });

        this.deleteMessage(this.notification[0]['nt_id']);
    }
}
