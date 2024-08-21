import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ModalComponent} from 'angular-custom-modal';
import {NgScrollbar} from 'ngx-scrollbar';
import {Store} from '@ngrx/store';
import {UserService} from 'src/app/service/user-service/user.service';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {Server, Socket} from 'socket.io';
import {io} from 'socket.io-client';
import {ChatServiceService} from 'src/app/service/chat-service/chat-service.service';
import {CustomerService} from 'src/app/service/customer/customer.service';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';


@Component({
    selector: 'app-chatmodule',
    templateUrl: './chatmodule.component.html',
    styleUrls: ['./chatmodule.component.css'],
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [
                style(
                    {opacity: 0, transform: 'scale(0.95)'}
                ),
                animate('100ms ease-out', style({opacity: 1, transform: 'scale(1)'}))
            ]),
            transition(':leave', [animate('75ms', style({opacity: 0, transform: 'scale(0.95)'}))]),
        ]),
    ]
})
export class ChatmoduleComponent implements OnInit {
    permission_Denied = 0;
    access_data : any;
    userfeatures : any;
    permittedaction : any;
    loading = true;
    user_details : any;
    us_id : any;
    loginUser : any = [];
    cust_list : any;
    contactList : any = [];
    base_img_url = environment.base_img_url;
    socket = io(environment.SOCKET_ENDPOINT);
    messages : any[] = [];
    user_selected : any = "";
    user_selected_id : any = 0;
    chat_loading=true;
    baseurl = environment.base_img_url;
    base_version= (environment.base_version)
    public message$ : BehaviorSubject < string > = new BehaviorSubject('');

    constructor(protected chatService : ChatServiceService,
         private usr_ser : UserService,
         private _lightbox : Lightbox,
         private _lightboxConfig : LightboxConfig,
         private cust_serv : CustomerService) {
        this.access_data = localStorage.getItem("access_data");
        this.us_id = localStorage.getItem("us_id");
        this.us_id = atob(atob(this.us_id));
        

    }
    ngOnInit() {
        this.userfeatures = JSON.parse(atob(atob(this.access_data)));
        this.userfeatures.forEach((element : any) => {
            element['ft_id'] == 3 ? this.permittedaction = element['actions'] : "";
        });

        if (this.permittedaction.includes('5')) {
            // this.getNewMessage().subscribe((message: string) => {
            //     // //console.log(message);
            // });
            this.usr_ser.fetch_cust_list().subscribe((rdata : any) => {
                if (rdata.ret_data == 'success') {


                    setTimeout(() => {
                        this.cust_list = rdata.cust_list

                        this.contactList = this.cust_list
                        // this.custlist();
                    }, 500)

                    this.loading = false;
                } else {
                    setTimeout(() => {
                        this.loading = false;
                    }, 550);
                }
            });

            this.socket.on('disconnect', () => {
            
            })
            this.getNewMessage().subscribe((message : any) => {


                if (message != "") {
                    if (message['usertyp'] == 1) { 

                        this.messages.push({
                            c_message: message['message'],
                            c_created_on: message['time'],
                            c_us_type: 1,
                            type: 'text',
                            files: [],
                            user: {
                                name: message['user'],
                                avatar: 'https://i.gifer.com/no.gif'
                            }
                        });
                    }

                }
                // //console.log("getNewMessage() Function is being called:");

                // //console.log("mwssages----------->",this.messages);

            })
        } else {
            this.permission_Denied = 1;
        }
    }


    @ViewChild('isAddNoteModal')isAddNoteModal !: ModalComponent;
    @ViewChild('isDeleteNoteModal')isDeleteNoteModal !: ModalComponent;
    @ViewChild('isViewNoteModal')isViewNoteModal !: ModalComponent;
    @ViewChild('scrollable')scrollable !: NgScrollbar;
    isShowUserChat = false;
    isShowChatMenu = false;


    searchUser = '';
    textMessage = '';
    selectedUser : any = null;

    searchUsers() {


        return this.contactList.filter((contact : {
            cstm_name: string
        }) => {
            return contact.cstm_name.toLowerCase().includes(this.searchUser.toLowerCase());
        });
    }
    scrollToBottom() {
        if (this.isShowUserChat) {
            setTimeout(() => {
                this.scrollable.scrollTo({bottom: 0});
            });
        }
    }

    getNewMessage = () => {

        this.socket.on("user_message", (data : any) => {
            this.scrollToBottom()
            data.usertyp = 1;
            this.message$.next(data);

        });


        return this.message$.asObservable();
    };

    getUserId(data : any) {

        this.socket.on('disconnect', () => {
            
        })
        this.chat_loading=true;
        
        
        this.selectedUser = data;
        this.isShowUserChat = true;
        this.isShowChatMenu = false;
        let _this = this;
        this.user_selected = data.cstm_name;
        this.user_selected_id = data.cstm_id;
        this.messages = [];
        let room_id=this.base_version=='test'?"RAMSTEST_SRC_" + data.cstm_id:"RAMS_" + data.cstm_id;

        this.socket.emit('create_room', {
            "room_id": room_id,
            "user": data
        });
        this.user_details=data;
        let isChat=false;
        // this.cust_serv.getcustomerbyId(btoa(data.cstm_id)).subscribe((rdata : any) => {

        //     if (rdata.ret_data == 'success') {
        //         this.user_details = rdata.data;

        //     } else {}
        // });

        this.chatService.get_chat_history({'c_customer_id': data.cstm_id}).subscribe((rdata : any) => {
            if (rdata.ret_data == "success") {
               
                if (rdata.chat_hist&&rdata.chat_hist.length > 0) {
                    isChat=true;
                    // rdata.chat_hist.forEach((element : any) => {
                    //     var lablName = "";
                    //     if (element.c_staff_id == this.us_id) {
                    //         lablName = "Me";
                    //     } else {
                    //         lablName = element.us_firstname;
                    //     }
                    //     if (element.c_us_type == "0") {
                    //         _this.messages.push({
                    //             text: element.c_message,
                    //             date: element.c_created_on,
                    //             reply: true,
                    //             type: 'text',
                    //             files: [],
                    //             user: {
                    //                 name: lablName,
                    //                 avatar: 'https://i.gifer.com/no.gif'
                    //             }
                    //         });
                    //     } else if (element.c_us_type == "1") {
                    //         _this.messages.push({
                    //             text: element.c_message,
                    //             date: element.c_created_on,
                    //             reply: false,
                    //             type: 'text',
                    //             files: [],
                    //             user: {
                    //                 name: _this.user_selected,
                    //                 avatar: 'https://i.gifer.com/no.gif'
                    //             }
                    //         });
                    //     }
                    // });
                }

            };

            setTimeout(() => {
                this.chat_loading=false;
                
            }, 1800);
            this.messages = isChat==true?rdata.chat_hist:[];
            this.scrollToBottom();


        });
        
    }

    sendMessage(message : any)
     {

      

        let pipe = new DatePipe('en-US');
        let userinfo = this.user_details;
        let room_id=this.base_version=='test'?"RAMSTEST_SRC_"+this.user_selected_id:"RAMS_"+this.user_selected_id;
        this.socket.emit('new_message_customer', {
            "room_id": room_id,
            "user": userinfo['cstm_name'],
            "message": message,
            "time": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "usertyp": 1,
            "c_message_type":0
        });


       


        this.chatService.save_chat({'c_staff_id': this.us_id, 'c_customer_id': this.user_selected_id, 'c_message_type': 0, 'c_message': message}).subscribe((rdata : any) => {
            if (rdata.ret_data == "success") {

                this.messages=this.messages.length==0?[]:this.messages;
                this.messages.push({
                    'c_staff_id': this.us_id,
                    'c_customer_id': this.user_selected_id,
                     'c_message_type': 0,
                      'c_message': message,
                      'c_id':rdata.chat_data.c_id,
                      'c_us_type':0,
                      'c_created_on':rdata.chat_data.c_created_on}
                      );
                      
                this.scrollToBottom();
            };
        });
        this.textMessage = '';

    }
    onEnter(event : Event) {
        const keyboardEvent = event as KeyboardEvent;
        if(this.textMessage){
            this.sendMessage(this.textMessage)
        }
       

    }
    triggerFileInput(): void {
        const fileInput = document.getElementById('hiddenFileInput') as HTMLInputElement;
        if (fileInput) {
          fileInput.click();
        }
      }

 

    upload(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          const files = input.files;
          
        //        this.socket.emit("upload", files[0], (status: any) => {
        //         //console.log(status);
        //   });
        }
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

}
