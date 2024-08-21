import {Router, ActivatedRoute} from '@angular/router';
import {ServicerequestService} from 'src/app/service/servicerequest/servicerequest.service';
import Swal from 'sweetalert2';
import Swiper, {Autoplay, Navigation, Pagination} from 'swiper';
import {Lightbox, LightboxConfig} from 'ngx-lightbox';
import {slideDownUp} from 'src/app/shared/animations';
import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ModalComponent} from 'angular-custom-modal';
import {NgScrollbar} from 'ngx-scrollbar';
import {UserService} from 'src/app/service/user-service/user.service';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {io} from 'socket.io-client';
import {ChatServiceService} from 'src/app/service/chat-service/chat-service.service';
import {CustomerService} from 'src/app/service/customer/customer.service';

@Component({
    selector: 'app-work-card-edit-module',
    templateUrl: './work-card-edit-module.component.html',
    styleUrls: ['./work-card-edit-module.component.css'],
    animations: [
      slideDownUp,
      trigger('toggleAnimation', [
        transition(':enter', [
          style({ opacity: 0, transform: 'scale(0.95)' }),
          animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
        ]),
        transition(':leave', [
          animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))
        ]),
      ]),
    ],
  })
export class WorkCardEditModuleComponent implements OnInit {
    @ViewChild('isAddNoteModal')isAddNoteModal !: ModalComponent;
    @ViewChild('isDeleteNoteModal')isDeleteNoteModal !: ModalComponent;
    @ViewChild('isViewNoteModal')isViewNoteModal !: ModalComponent;
    @ViewChild('scrollable')scrollable !: NgScrollbar;
    isShowUserChat = false;
    isShowChatMenu = false;

    isStopwatchRunning : boolean = false;
    quote_items : any = [];
    totalprice : any;
    subtotal : any;
    app_jobs : any;
    app_workcard : any;
    activefunctions : any;
    requestedby : any;
    vend_list : any;
    vendor_id = -1;
    days = 0;
    tool_reqs : any = [];
    rows : any;
    usritems : any = [];
    date : any;
    documents : any = [];
    accordians3 : any = 2;
    tab10 = 'v_details';
    datacard_len = 0;
    servpack_id : any;
    chat_loading = true;
    messages : any[] = [];
    expert_messages:any[] = [];
    socket = io(environment.SOCKET_ENDPOINT);
    textMessage = '';
    us_id : any;
    user_selected : any = "";
    user_selected_id : any = 0;
    selectedUser : any = null;
    searchUser = '';
    loader=true
    imageurl:any
    c_img_loader:boolean=false;
    c_aud_loader:boolean=false;
    c_doc_loader:boolean=false;
    base_version= (environment.base_version)
    wokCardHoldFlag:boolean=false;
    workCard_Unhold_Flag :boolean=false;
    isubmitvendorFlag: boolean=false;
    isubmitvendorValid:boolean=false;

    startStopwatch() {

        this.isStopwatchRunning = true;
    }

    pauseStopwatch() {

        this.isStopwatchRunning = false;
    }

    resumeStopwatch() {

        this.isStopwatchRunning = true;
    }
    codeArr : any = [];
    params : any;
    request_id : any;
    request_details : any;
    package_details : any;
    services : any
     user_list : any;
    key_word : any = 'us_firstname';
    search_word : any = 'servpack_name';
    completeflag = false;
    baseurl=this.base_version==='local'?environment.base_img_url:'';
    medias : any;
    dropdownSettings : any;
    swiper1 : any;
    viewnewservice = '0';
    hold_reason : any;
    sitem_hold_reason : any;
    userrole_id : any;
    rec_toolarray : any = [];
    recomendtoolsflag = 0;
    user_details : any;
    items : any = [];
    tax = 0;
    contactList:any=[]
    is_expert_service:boolean=false;
    exp_contactList:any=[]
    assigne_details:any=[]
    public message$ : BehaviorSubject < string > = new BehaviorSubject('');
    constructor(private router : Router, 
        private activerouter : ActivatedRoute,
         private requestService : ServicerequestService,
          private usr_ser : UserService, 
          private _lightbox : Lightbox, 
          private _lightboxConfig : LightboxConfig,
           private datePipe : DatePipe, 
           protected chatService : ChatServiceService,
           private cust_serv : CustomerService) {
        this.userrole_id = localStorage.getItem('us_role_id');
        this.userrole_id = atob(atob(this.userrole_id));
        this.us_id= localStorage.getItem('us_id');
        this.us_id = atob(atob(this.us_id));
        this.request_id = this.activerouter.snapshot.paramMap.get('id')!;

        if (this.request_id) {
            let apiCount = 3;
            this.usr_ser.fetch_service_details(this.request_id).subscribe((rdata : any) => {
                if (rdata.ret_data == 'success') {
                    this.request_details = rdata.result;
                    this.package_details = rdata.Packages;
                    this.services = rdata.services;
                    this.assigne_details=rdata.Assigne_det?rdata.Assigne_det:[];
                    this.baseurl=this.base_version==='local'?this.baseurl:rdata.imageurl
                    this.expert_assigned();
                    this.chat_users();
                    if ((this.request_details.cus_media.documents.length) > 0) {
                        this.documents = this.request_details.cus_media.documents;
                    }
                    if (rdata.services.filter((d : any) => (d.sitem_type === '0' && d.sitem_status_flag !== '2') || (d.sitem_type === '1' && d.sitem_status_flag === '4' && d.requet_details.sm_id === 16)).length === 0) {
                        this.completeflag = true;
                    }
                    this.medias = rdata.medias;
                    this.app_workcard = rdata.app_workcard;
                    _lightboxConfig.enableTransition = false;
                    _lightboxConfig.wrapAround = true;
                    _lightboxConfig.positionFromTop = 0;
                    _lightboxConfig.disableScrolling = true;
                    this.recommended_tools();
                    this.tool_recomendation()
                    this.openbox();
                    this.bindFancybox()
                    this.view_Active_Services();
                    this.date = this.datePipe.transform(this.request_details.serm_createdon, 'dd-MMM-yyyy hh:mm a');

                    apiCount--;
                    this.checkLoader(apiCount);
                }else{
                    apiCount--;
                    this.checkLoader(apiCount);
                }
            });
            this.usr_ser.fetch_user().subscribe((rdata : any) => {
                if (rdata.ret_data == 'success') {
                    this.user_list = rdata.user_list
                    apiCount--;
                    this.checkLoader(apiCount);
                }else{
                    apiCount--;
                    this.checkLoader(apiCount);
                }
            });
            this.usr_ser.fetch_vendors_list().subscribe((rdata : any) => {` `
                if (rdata.ret_data == 'success') {
                    this.vend_list = rdata.vend_list
                    apiCount--;
                    this.checkLoader(apiCount);
                }else{
                    apiCount--;
                    this.checkLoader(apiCount);
                }
            });
            // setTimeout(() => {
            //     this.loader=false;
                
            // }, 1200);
        }
    }
    checkLoader(apiCount:any) {
        if (apiCount === 0) {
          this.loader = false;  // Set loader to false only when all APIs finish
        }
      }

    expert_assigned(){

        if(this.request_details.serm_vendor_flag==1){
            this.is_expert_service=true;
            return
        }else{
           let  services = this.services.map((service: { sitem_assignee_type: string; }) => {
                if (service.sitem_assignee_type === "1") {
                    return {
                        ...service,
                        is_expert_service: true
                    };
                }
                return service;
            });
        }

    }

    chat_users(){

        let a=this.contactList.length
        
      
        if((this.request_details['customer_details'].length)>0){
           
            this.contactList[a]=this.request_details.customer_details[0];
           
           
        }
        
        if(this.is_expert_service==true){
            let a=this.exp_contactList.length
            this.exp_contactList[a]=this.assigne_details
        }
        
    }

    cols = [
        {
            field: 'serm_number',
            title: 'Service Request Code'
        },
        {
            field: 'tldet_number',
            title: 'Tool Request Code'
        },
        {
            field: 'current_status',
            title: 'Assigned Status'
        },
        {
            field: 'sm_name',
            title: 'Request Status'
        }, {
            field: 'Action',
            title: 'Action'
        },
    ];
    recommended_tools() {
        let j = this.tool_reqs.length
        for (let i = 0; i < this.services.length; i++) {
            if (this.services[i]['tool_id']) {
                this.tool_reqs[j] = this.services[i];
                j++
            }
        }
        this.rows = this.tool_reqs;


    }
    tooledit(id : any) {
        this.router.navigateByUrl('tool-request-edit/' + (
            btoa(id)
        ));
    }
    tool_recomendation() {
        this.rec_toolarray = [];
       

        for (let i = 0; i < this.package_details.length; i++) {

            for (let j = 0; j < this.services.length; j++) {
                if (this.package_details[i]['servpack_id'] == this.services[j]['servpack_id']) {
                    if(this.package_details[i]['tools']){
                        this.set_tool_rec(this.package_details[i]['tools'])
                    }
                  
                }
            }


        }

       
        


    }
     
    set_tool_rec(tools: []) {
        let k = 0; // Index for rec_toolarray (starts from 0)
         // Clear the array
      
        let seenToolIds = new Set<number>(); // Set to store encountered tool IDs
      
        for (let i = 0; i < tools.length; i++) {
          const toolId = tools[i]['tool_id'];
      
          if (!seenToolIds.has(toolId)) { // Check if tool ID is new
            this.rec_toolarray[k] = tools[i];
            seenToolIds.add(toolId);
            k++; // Increment index only when a new tool is added
          }
        }
      }

    bindFancybox() {
        this._lightboxConfig.showImageNumberLabel = true;
        this._lightboxConfig.showZoom = true;
        this._lightboxConfig.showRotate = true;
        this._lightboxConfig.showDownloadButton = true;
        this._lightboxConfig.fitImageInViewPort = true;
        this._lightboxConfig.albumLabel = '%1 of %2';

        for (let i = 0; i < this.medias.length; i++) {
            if (this.medias[i]['smedia_type'] == 0) {
                const media = this.medias[i];
                const srcValue = this.baseurl + media.smedia_url;
                const caption = 'image' + '_' + i;
                const title = 'smedia_id' + '_' + i;
                this.items.push({src: srcValue, caption: caption, title: title});
            }

        }


    }
    open(index : number): void {


        this._lightbox.open(this.items, index);
    }
    ngAfterViewInit() {
        this.swiper1 = new Swiper('#slider1', {
            modules: [
                Navigation, Pagination
            ],
            navigation: {
                nextEl: '.swiper-button-next-ex1',
                prevEl: '.swiper-button-prev-ex1'
            },
            pagination: {
                el: '#slider1 .swiper-pagination',
                type: 'bullets',
                clickable: true
            }
        });
    }

    ngOnInit() {

        this.getNewMessage().subscribe((message : any) => {


            if (message != "") {
                if (message['usertyp'] == 1) {

                    this.messages.push({
                        sc_message: message['message'],
                        sc_created_on: message['time'],
                        sc_message_type:message['sc_message_type'],
                        sc_us_type: 1,
                        type: 'text',
                        files: [],
                        user: {
                            name: message['user'],
                            avatar: 'https://i.gifer.com/no.gif'
                        }
                    });
                }

            }

        })


    }

    getNewMessage = () => {

        this.socket.on("user_message", (data : any) => {
            this.scrollToBottom()
            data.usertyp = 1;
            this.message$.next(data);

        });


        return this.message$.asObservable();
    };


    update_workcard() {
        let input_data = {
            master_data: this.request_details,
            services: this.package_details
        }

        this.usr_ser.update_workcard(input_data).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') { // this.showMessage('Quote sent successfully', 'success');
                setTimeout(() => {
                    this.router.navigateByUrl('quotation-request-list');
                }, 1000);
            } else {}
        });

    }
    selectedChange(data : any) {

        let inData = {
            sitem_id: data.sitem_id,
            status: data.sitem_status_flag,
            type: 0,
            serm_id: data.sitem_serid
        }
        this.usr_ser.servicestatus_update(inData).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('Work Updated', 'success');
                if (data.sitem_status_flag == 1) {
                    this.startStopwatch()
                } else if (data.sitem_status_flag == 2) {
                    this.pauseStopwatch()
                }
                window.location.reload();


            } else {
                this.showMessage('Error', 'error');
            }
        });


    }


    startWork(id : any) {

        this.loader=true
        let inData = {
            serm_id: id,
            status: 28,
            type: 1
        }
        this.usr_ser.servicestatus_update(inData).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('Work Started', 'success');
               window.location.reload()

            } else {
                this.loader=false
                this.showMessage('Error', 'error');
            }
        });


    }
    completeWork(id : any) {
        this.loader=true
        let inData = {
            serm_id: id,
            status: 29,
            type: 1,
            c_status: this.request_details.serm_status,
            rpt_id: this.request_details.rpt_id
        }

        this.usr_ser.servicestatus_update(inData).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('Work completed', 'success');
                setTimeout(() => {
                    this.router.navigateByUrl('work-card-list');
                }, 1000);
            } else {
                this.loader=false
                this.showMessage('Error', 'error');
            }
        });


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
    wrokcardlist() {
        this.router.navigateByUrl('/work-card-list');
    }


    workcardhold(sid : any, type : any, amid : any, pack : any) {
        this.wokCardHoldFlag=true;
        if(this.wokCardHoldFlag){
            const id = atob(this.request_id)
            if (type == 2) {
                if (this.userrole_id == 1) {
                    let data = {
                        'serm_id': id,
                        'service': sid,
                        'am_id': amid,
                        'sitem_hold_reason': this.sitem_hold_reason
                    }
                    this.usr_ser.hold_workcard(data).subscribe((rdata : any) => {
                        if (rdata.ret_data == 'success') {
                            this.pauseStopwatch()
                            this.showMessage('WorkCard is in Hold', 'success');
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                            this.wokCardHoldFlag=false;
                        } else {
                            this.showMessage('Error', 'error');
                            this.wokCardHoldFlag=false;
                        }
                    });
                } else {
    
                    const services = {
                        'sitem_id': sid,
                        'servpack_id': pack,
    
                        'am_reason': this.sitem_hold_reason
                    }
                    let data = {
                        'serm_id': id,
                        'services': services,
                        'am_id': amid
                    }
                    this.usr_ser.holdjob_by_user(data).subscribe((rdata : any) => {
                        if (rdata.ret_data == 'success') {
                            this.pauseStopwatch()
                            this.showMessage('Requested For Admin Approval', 'success');
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                            this.wokCardHoldFlag=false;
                        } else {
                            this.showMessage('Error', 'error');
                            this.wokCardHoldFlag=false;
                        }
                    });
                }
    
            } else {
    
                if (this.userrole_id == 1) {
                    let data = {
                        'serm_id': id,
                        'sitem_hold_reason': this.hold_reason,
                        'am_id': this.app_workcard.am_id
                    }
                    this.usr_ser.hold_workcard(data).subscribe((rdata : any) => {
                        if (rdata.ret_data == 'success') {
                            this.showMessage('WorkCard is in Hold', 'success');
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } else {
                            this.showMessage('Error', 'error');
                        }
                    });
                } else {
                    let data = {
                        'serm_id': id,
                        'am_reason': this.hold_reason,
                        'am_id': this.app_workcard.am_id
                    }
                    this.usr_ser.holdreq_by_user(data).subscribe((rdata : any) => {
                        if (rdata.ret_data == 'success') {
                            this.showMessage('Requested For Admin Approval', 'success');
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } else {
                            this.showMessage('Error', 'error');
                        }
                    });
                }
    
            }
        }
       


    }

    workcard_unhold(sid : any, type : any, amid : any) {
        let id = atob(this.request_id)
        this.workCard_Unhold_Flag=true;
        if(this.workCard_Unhold_Flag){
            if (type == 2) {
           
            
                if (this.userrole_id == 1) {
                    let data = {
                        'serm_id': id,
                        'service': sid,
                        'am_id': amid
                    }
                    this.usr_ser.workcard_unhold(data).subscribe((rdata : any) => {
                        if (rdata.ret_data == 'success') {
                            this.startStopwatch();
                            this.showMessage('WorkCard Resumed', 'success');
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } else {
                            this.workCard_Unhold_Flag=false;
                            this.showMessage('Error', 'error');
                        }
                    });
                } else {
    
                    let data = {
                        'serm_id': id,
                        'service': sid,
                        'am_id': amid
                    }
                    this.usr_ser.unholdjob_by_user(data).subscribe((rdata : any) => {
                        if (rdata.ret_data == 'success') {
                            this.startStopwatch();
                            this.showMessage('Requested For Admin Approval', 'success');
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } else {
                            this.workCard_Unhold_Flag=false;
                            this.showMessage('Error', 'error');
                        }
                    });
    
                
            }
            

        } else {

            if (this.userrole_id == 1) {
                let data = {
                    'serm_id': id,
                    'flag': 1,
                    'am_id': this.app_workcard.am_id
                }
                this.usr_ser.workcard_unhold(data).subscribe((rdata : any) => {
                    if (rdata.ret_data == 'success') {
                        this.showMessage('WorkCard Resumed', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } else {
                        this.workCard_Unhold_Flag=false;
                        this.showMessage('Error', 'error');
                    }
                });
            } else {
                let data = {
                    'serm_id': id,
                    'flag': 1,
                    'am_id': this.app_workcard.am_id
                }
                this.usr_ser.unholdreq_by_user(data).subscribe((rdata : any) => {
                    if (rdata.ret_data == 'success') {
                        this.showMessage('Requested For Admin Approval', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } else {
                        this.workCard_Unhold_Flag=false;
                        this.showMessage('Error', 'error');
                    }
                });
            }

        }
        }
        
    }

    view_Service(id : any) {
        if (id == 0) {
            this.viewnewservice = '1';
        } else {
            this.viewnewservice = '0';
        }

    }


    delete_service(id : any) {

        let inData = {
            sitem_id: id

        }

        this.usr_ser.delete_service(inData).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('Service Deleted', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                this.showMessage('Error', 'error');
            }
        });


    }

    addItem() {


        let maxId = 0;
        if (this.quote_items && this.quote_items.length) {
            maxId = this.quote_items.reduce((max : number, character : any) => (character.id > max ? character.id : max), this.quote_items[0].id);
        }
        this.quote_items.push({
            id: maxId + 1,
            service_id: '0',
            service_name: '',
            amount: 0
        });
    }

    removeItem(item : any = null) {
        this.quote_items = this.quote_items.filter((d : any) => d.id != item.id);
        this.calculateTotal(this.quote_items);
    }
    selectEvent($event : any, index : any) {

        this.quote_items[index]['amount'] = $event.servpack_cost;
        this.quote_items[index]['servpack_cost'] = $event.servpack_cost;
        this.quote_items[index]['servpack_id'] = $event.servpack_id;
        this.calculateTotal(this.quote_items);
        // this.subtotal =this.subtotal+parseFloat($event.servpack_cost)

    }

    onClearevent(index : any) {

        this.quote_items[index]['amount'] = 0;
        this.quote_items[index]['servpack_cost'] = 0;
        this.quote_items[index]['servpack_id'] = null;
        this.totalprice = this.calculateTotal(this.quote_items);
    }
    calculateTotal(quote_items : []) {
        this.subtotal = 0;
        if (quote_items.length > 0) {
            quote_items.forEach(element => {
                this.subtotal = this.subtotal + parseFloat(element['amount']);
            });

        }

    }
    changeAmount(index:any,amount:any){
        console.log("index:any,amount:any",index,amount)
        this.subtotal =0;
        this.quote_items[index]['amount'] = amount;
        this.calculateTotal(this.quote_items);
    }

    send_quote() {

        let data = {
            serm_id: this.request_details.serm_id,
            totalcost: this.subtotal,
            services: this.quote_items
        }

        this.usr_ser.add_service(data).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('Request Sent To Customer', 'success');
                window.location.reload();
            } else {
                this.showMessage('Error', 'error');
            }
        });
    }

    view_Active_Services() {
        let i = 0;
        let count = 0;
        for (i = 0; i < this.services.length; i++) {
            if (this.services[i]['sitem_active_flag'] == 1) {
                count = count + 1;
            } else {
                count = 0;
            }
        }

        this.activefunctions = count;


    }

    workcardholdedby() {

        let i = 0;
        let count = 0;
        for (i = 0; i < this.services.length; i++) {
            if (this.services[i]['am_requestedby'] == 0) {
                count = count + 1;
            } else {
                count = 0;
            }
        }
        if (this.app_workcard.am_requestedby) {
            count = count + 1
        }
        this.requestedby = count;

    }

    recomendtools(id : any) {
        if (id == 0) {
            this.recomendtoolsflag = 1;
        } else {
            this.recomendtoolsflag = 0;
        }
    }

    toolrecomendation(tdata : any) {

        let data = {
            'sitem_serid': this.request_details.serm_id,
            'sitem_itemid': tdata.srm_tool_id,
            'sitem_cost': tdata.tool_rent_cost,
            'days': this.days
        }
        this.usr_ser.toolrecomendation(data).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('Request Sent To Customer', 'success');
                window.location.reload();
            } else {
                this.showMessage('Error', 'error');
            }
        });
    }

    assign_to_exp(sitem_id : any) {

        this.isubmitvendorFlag=true;
        if(this.vendor_id!==-1){
            this.loader=true;
            this.usr_ser.job_assign_expert({sitem_id: sitem_id,cstm_id: this.vendor_id}).subscribe((rdata : any) => {
                if (rdata.ret_data == 'success') {
                    this.showMessage('Assigned to Expert!!!', 'success');
                    window.location.reload();
                } else {
                    this.showMessage('Error!!!', 'error');
                }
            });
        }else{
            this.isubmitvendorValid=true
        }
    }

    selectedChangeforexpert(data : any) {

        let inData = {
            sitem_id: data.sitem_id,
            status: 2,
            type: 0,
            serm_id: data.sitem_serid
        }
        this.usr_ser.servicestatus_update(inData).subscribe((rdata : any) => {
            if (rdata.ret_data == 'success') {
                this.showMessage('Work Updated', 'success');
                if (data.sitem_status_flag == 1) {
                    this.startStopwatch()
                } else if (data.sitem_status_flag == 2) {
                    this.pauseStopwatch()
                }
                window.location.reload();


            } else {
                this.showMessage('Error', 'error');
            }
        });


    }
    openbox() {
        this._lightboxConfig.showImageNumberLabel = true;
        this._lightboxConfig.showZoom = true;
        this._lightboxConfig.showRotate = true;
        this._lightboxConfig.showDownloadButton = true;
        this._lightboxConfig.fitImageInViewPort = true;
        this._lightboxConfig.albumLabel = '%1 of %2';
        this.datacard_len = this.request_details.data_cards;

        this.request_details.data_cards.map((r_images: { cvehcard_url: any; }, i: any) => {
            const srcValue = this.baseurl + r_images.cvehcard_url;
            const caption = 'image' + '_' + i;
            const title = 'smedia_id' + '_' + i;
    
            this.usritems.push({src: srcValue, caption: caption, title: title});
        });

    }
    opendatacard(index : number): void {
        this._lightbox.open(this.usritems, index);
    }
    document_download() {
        this.documents.map((doc: { [x: string]: any; }) => {
            const url = doc['rmedia_url'];
            const a = document.createElement('a');
            a.href = url;
            a.download = 'document_name'; // You can set the desired name for the downloaded file
            a.click();
        });
      }
    workcard_details(id : any) {

        this.router.navigateByUrl('work-card-create/' + btoa(id));

    }
   
    onEnter(event : Event) {
        const keyboardEvent = event as KeyboardEvent;
        this.sendMessage(this.textMessage,0)

    }
    scrollToBottom() {
        if (this.isShowUserChat) {
            setTimeout(() => {
                this.scrollable.scrollTo({bottom: 0});
            });
        }
    }

    searchUsers() {


        return this.contactList.filter((contact : {
            cstm_name: string
        }) => {
            return contact.cstm_name.toLowerCase().includes(this.searchUser.toLowerCase());
        });
    }

    searchUserrsexp() {


        return this.exp_contactList.filter((contact : {
            cstm_name: string
        }) => {
            return contact.cstm_name.toLowerCase().includes(this.searchUser.toLowerCase());
        });
    }

    getUserId(data : any) {
        this.socket.on('disconnect', () => {})
        this.selectedUser = data;
        this.user_selected = data.cstm_name;
        this.user_selected_id = data.cstm_id;
        let room_id=this.base_version=='test'?"RAMSTEST_SRC_" + data.cstm_id+"_" +this.request_details['serm_id']:"RAMS_SRC_" + data.cstm_id+"_" +this.request_details['serm_id'];
        this.socket.emit('create_room', {
            "room_id": room_id,
            "user": data.cstm_name
        });
        this.cust_serv.getcustomerbyId(btoa(data.cstm_id)).subscribe((rdata : any) => {

            if (rdata.ret_data == 'success') {
                this.user_details = rdata.data;

            } else {}
        });
        this.fetch_chat_hit()
    }
   
    fetch_chat_hit(){
        this.chat_loading = true;
        this.isShowUserChat = true;
        this.isShowChatMenu = false;
        let _this = this;
        this.messages = [];
        this.expert_messages=[];
        this.chatService.get_service_chat({'serm_id': this.request_details['serm_id']}).subscribe((rdata : any) => {
            if (rdata.ret_data == "success") {
                if (rdata.chat_details.length > 0) {
                    rdata.chat_details.map((chat_detail: { sc_us_type: any; }) => {
                        if (chat_detail.sc_us_type === "3" || chat_detail.sc_us_type === "4") {
                          this.expert_messages.push(chat_detail);
                        } else {
                          this.messages.push(chat_detail);
                        }
                      });
                      
                    this.scrollToBottom();
                }

            };
            
            setTimeout(() => {
                this.chat_loading = false;

            }, 1800);
            this.scrollToBottom();

        });
    }
    upload(event: Event): void 
    {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          const files = input.files;
          
        }
      }
    sendMessage(message : any,type:any) {

     

        let pipe = new DatePipe('en-US');
        let userinfo = this.user_details;
    let room_id=this.base_version=='test'?"RAMSTEST_SRC_" + userinfo['cstm_id']+"_" +this.request_details['serm_id']:"RAMS_SRC_" + userinfo['cstm_id']+"_" +this.request_details['serm_id']

        this.socket.emit('new_message_customer', {
            "room_id": room_id,
            "user": userinfo['cstm_name'],
            "message": message,
            "time": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "usertyp": 1,
            "sc_message_type":type
        });
        

    


        this.chatService.save_service_chat(

            {
                'sc_staff_id': this.us_id,
                'sc_customer_id': this.user_selected_id,
                'sc_message_type': type,
                'sc_message': message,
                'sc_req_id':this.request_details['serm_id'],
                'sc_req_type':0,
                'sc_us_type':0
            
            }
            
            ).subscribe((rdata : any) => {
            if (rdata.ret_data == "success") {

                this.messages.push(rdata.chat_data);
                this.scrollToBottom();
            };
        });

        
        this.textMessage = '';

        // if (botReply) {
        // setTimeout(() => { this.messages.push(botReply); }, 500);
        // }
    }

custom_confirm_modal()
  {

    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      padding: '2em',
      customClass: 'sweet-alerts',
  }).then((result) => {
      if (result.value) {
        this.loader=true;
        this.send_quote()
          
      }
  });
  }

  copytext(text:any) {
      
    navigator.clipboard.writeText(text);
  }

 
  onFile_aud_Changed(event: any) {
    this.c_aud_loader=true;
    const file = event.target.files[0];

    
    if (file && file.type.startsWith('audio/')) {
        const reader = new FileReader();
        const inData = new FormData();
        inData.append('c_audio', file);
        reader.readAsDataURL(file);
        reader.onload = e => this.imageurl = reader.result;
        
        this.chatService.chat_aud_upload(inData).subscribe((rdata: any) => {
            if (rdata.ret_data == "success") {
                this.sendmediamessage(rdata.path, 1);
            } else {
                this.showMessage('Upload Error!!Please Try Again','error');
            }
        });
    } else {
        this.showMessage('Please Select a Valid Audio File','error');
    }
    this.c_aud_loader=false;
}

onFile_doc_Changed(event: any) {
    this.c_doc_loader = true;
    if(this.base_version==='local'){
        const file = event.target.files[0];

        if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            const reader = new FileReader();
            const inData = new FormData();
            inData.append('c_document', file);
            reader.readAsDataURL(file);
            reader.onload = e => this.imageurl = reader.result;
            
            this.chatService.chat_doc_upload(inData).subscribe((rdata: any) => {
                if (rdata.ret_data === "success") {
                    this.sendmediamessage(rdata.path, 4);
                } else {
                    this.showMessage('Upload Error!!Please Try Again', 'error');
                }
            });
        } else {
            this.showMessage('Please Select a Valid Document/PDF File', 'error');
        }
    }else{
        let filetype=event.target.files[0].type.split("/",1);
        const [file] = event.target.files;

        if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            const reader = new FileReader();
            const inData = new FormData();
            
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.chatService.chat_doc_upload({'c_document':reader.result}).subscribe((rdata: any) => {
                    if (rdata.ret_data === "success") {
                        this.sendmediamessage(rdata.path, 4);
                    } else {
                        this.showMessage('Upload Error!!Please Try Again', 'error');
                    }
                });
            }
            
            
        } else {
            this.showMessage('Please Select a Valid Document/PDF File', 'error');
        }
    }

    this.c_doc_loader = false;
}

onFileChanged(event: any) {

    this.c_img_loader=true;
    
    if(this.base_version==='local'){

        const file = event.target.files[0];
        if (!file.type.startsWith('image/')) {
          this.showMessage("Please select a valid image file.",'error')
          return;
        }
        const inData = new FormData();
        inData.append('c_image', file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => this.imageurl = reader.result;
        this.chatService.chat_image_upload(inData).subscribe((rdata: any) => {
          if (rdata.ret_data == "success") {
            this.sendmediamessage(rdata.path, 2);
          } else {
              this.showMessage("Upload Error!!Please Try Again.",'error')
          }
        });
    }else{
        const reader = new FileReader();
        if(event.target.files && event.target.files.length) {
          let filetype=event.target.files[0].type.split("/",1);
          
          if(filetype[0]=='image'){
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
             this.imageurl = reader.result as string;
              this.chatService.chat_image_upload({'c_image':reader.result}).subscribe((rdata : any) => {
                if (rdata.ret_data == "success") {
                    this.sendmediamessage(rdata.path, 2);
                }
            });
            };
          }else{
           this.showMessage("Please select a valid image file.", 'error')
          }
        }
    }

    this.c_img_loader=false;
  }

  sendmediamessage(message : any,type:any)
   {

    this.chat_loading=true;

    this.chatService.save_service_chat(

        {
            'sc_staff_id': this.us_id,
            'sc_customer_id': this.user_selected_id,
            'sc_message_type': type,
            'sc_message': message,
            'sc_req_id':this.request_details['serm_id'],
            'sc_req_type':0,
            'sc_us_type':0
        
        }
        
        ).subscribe((rdata : any) => {
        if (rdata.ret_data == "success") {

            this.messages.push(rdata.chat_data);
            this.scrollToBottom();
        };
    });    
    this.textMessage = '';
    this.chat_loading=false;

    
    let userinfo = this.user_details;
    let room_id=this.base_version=='test'?"RAMSTEST_SRC_" + userinfo['cstm_id']+"_" +this.request_details['serm_id']:"RAMS_SRC_" + userinfo['cstm_id']+"_" +this.request_details['serm_id']
    this.socket.emit('new_message_customer', {
        "room_id": room_id,
        "user": userinfo['cstm_name'],
        "message": message,
        "time": new Date().toISOString().slice(0, 19).replace('T', ' '),
        "usertyp": 1,
        "sc_message_type":type
    });
    this.scrollToBottom();
}
  
  // Function to compress the image
  compressImage(file: File, quality: number, callback: (compressedFile: File) => void)
   {
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = (event: any) => {
      const img = new Image();
      img.src = event.target.result;
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        if (ctx) {
          const width = img.width;
          const height = img.height;
          canvas.width = width;
          canvas.height = height;
  
          ctx.drawImage(img, 0, 0, width, height);
  
          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              callback(compressedFile);
            }
          }, 'image/jpeg', quality);
        } else {
          console.error('Failed to get 2D context');
        }
      };
    };
  }

  openLightbox(message: any): void {
    const album = [
      {
        src: this.baseurl + message.sc_message,
        caption: 'Image caption', // Optional caption
        thumb: this.baseurl + message.sc_message
      }
    ];
    this._lightbox.open(album, 0);
  }
  
  ImageHandler(event: ClipboardEvent) {
    this.c_img_loader = true;
    const items = event.clipboardData?.items;
    if (items) {
      const itemsArray = Array.from(items);
      for (const item of itemsArray) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            
              const inData = new FormData();
              inData.append('c_image', blob);
  
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onload = e => this.imageurl = reader.result;
  
              this.chatService.chat_image_upload(inData).subscribe((rdata: any) => {
                if (rdata.ret_data == "success") {
                  this.sendmediamessage(rdata.path, 2);
                } else {
                  this.showMessage("Upload Error!!Please Try Again.", 'error');
                }
              });
  
              this.c_img_loader = false;
            
          }
        }
      }
    }
  }
  
  c_document_download(dc_url:any) {
  
    
    
        const url = this.baseurl+dc_url;
        const a = document.createElement('a');
        a.href = url;
        a.download = this.request_details['serm_number']+'_'+'Chat_Attachment'; // You can set the desired name for the downloaded file
        a.click();
    
  }


    
}
