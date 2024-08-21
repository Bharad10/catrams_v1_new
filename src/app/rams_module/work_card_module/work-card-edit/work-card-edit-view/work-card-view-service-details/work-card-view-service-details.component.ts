import {Router, ActivatedRoute} from '@angular/router';
import {ServicerequestService} from 'src/app/service/servicerequest/servicerequest.service';
import Swal from 'sweetalert2';
import Swiper, {Autoplay, Navigation, Pagination} from 'swiper';
import {Lightbox, LightboxConfig} from 'ngx-lightbox';
import {slideDownUp} from 'src/app/shared/animations';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
  selector: 'app-work-card-view-service-details',
  templateUrl: './work-card-view-service-details.component.html',
  styleUrls: ['./work-card-view-service-details.component.css']
})
export class WorkCardViewServiceDetailsComponent {
  base_version= (environment.base_version)
  @ViewChild('isAddNoteModal')isAddNoteModal !: ModalComponent;
  @ViewChild('isDeleteNoteModal')isDeleteNoteModal !: ModalComponent;
  @ViewChild('isViewNoteModal')isViewNoteModal !: ModalComponent;
  @ViewChild('scrollable')scrollable !: NgScrollbar;
  @Input()request_details : any = [];
  @Input()base_img_url : any;
  @Input()tab10 : any = '';
  @Input()date : any = '';
  @Input()documents : any = [];

  isShowUserChat = false;
  isShowChatMenu = false;
  datacard_len = 0;
    servpack_id : any;
    chat_loading = true;
    messages : any[] = [];
    socket = io(environment.SOCKET_ENDPOINT);
    baseurl=this.base_version==='local'?environment.base_img_url:'';
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
    contactList:any=[]
    usritems : any = [];
    items : any = [];
    medias : any;
    c_doc_loader:boolean=false;
    user_details : any=[];
    public message$ : BehaviorSubject < string > = new BehaviorSubject('');
    constructor(private router : Router, 
        private activerouter : ActivatedRoute,
          private usr_ser : UserService, 
          private _lightbox : Lightbox, 
          private _lightboxConfig : LightboxConfig,
           private datePipe : DatePipe, 
           protected chatService : ChatServiceService,
           private cust_serv : CustomerService){

           }

workcard_details(id : any) {

this.router.navigateByUrl('work-card-create/' + btoa(id));

}

copytext(text:any) {
  navigator.clipboard.writeText(text);
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

searchUsers() {


  return this.contactList.filter((contact : {
      cstm_name: string
  }) => {
      return contact.cstm_name.toLowerCase().includes(this.searchUser.toLowerCase());
  });
}

getUserId(data : any) {

  this.chat_loading = true;

  this.socket.on('disconnect', () => {})
  this.selectedUser = data;
  this.isShowUserChat = true;
  this.isShowChatMenu = false;
  let _this = this;
  this.user_selected = data.cstm_name;
  this.user_selected_id = data.cstm_id;
  this.messages = [];
  this.socket.emit('create_room', {
      "room_id": "RAMS_SRC_" + data.cstm_id+"_" +this.request_details['serm_id'],
      "user": data.cstm_name
  });


  this.cust_serv.getcustomerbyId(btoa(data.cstm_id)).subscribe((rdata : any) => {

      if (rdata.ret_data == 'success') {
          this.user_details = rdata.data;

      } else {}
  });

  this.chatService.get_service_chat({'serm_id': this.request_details['serm_id']}).subscribe((rdata : any) => {
      if (rdata.ret_data == "success") {
          if (rdata.chat_details.length > 0) {
              this.messages = rdata.chat_details;
              this.scrollToBottom();
          }

      };
      setTimeout(() => {
          this.chat_loading = false;

      }, 1800);
      this.scrollToBottom();
  });
  

}
open(index : number): void {


  this._lightbox.open(this.items, index);
}

scrollToBottom() {
  if (this.isShowUserChat) {
      setTimeout(() => {
          this.scrollable.scrollTo({bottom: 0});
      });
  }
}

c_document_download(dc_url:any) {
  const url = this.baseurl+dc_url;
  const a = document.createElement('a');
  a.href = url;
  a.download = this.request_details['serm_number']+'_'+'Chat_Attachment'; // You can set the desired name for the downloaded file
  a.click();

}
onEnter(event : Event) {
  const keyboardEvent = event as KeyboardEvent;
  this.sendMessage(this.textMessage,0)

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
          this.compressImage(blob, 0.7, (compressedFile) => {
            const inData = new FormData();
            inData.append('c_image', compressedFile);

            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onload = e => this.imageurl = reader.result;

            this.chatService.chat_image_upload(inData).subscribe((rdata: any) => {
              if (rdata.ret_data == "success") {
                this.sendmediamessage(rdata.path, 2);
              } else {
                this.showMessage("Upload Error!!Please Try Again.", 'error');
              }
            });

            this.c_img_loader = false;
          });
        }
      }
    }
  }
}

sendMessage(message : any,type:any) {

     

  let pipe = new DatePipe('en-US');
  let userinfo = this.user_details;
  this.socket.emit('new_message_customer', {
      "room_id": "RAMS_SRC_" + userinfo['cstm_id']+"_" +this.request_details['serm_id'],
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

onFileChanged(event: any) {

  this.c_img_loader=true;
  
  
  const file = event.target.files[0];

  // Validate the file type
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

  
  this.c_img_loader=false;
}

onFile_doc_Changed(event: any) {
  this.c_doc_loader = true;
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
  this.c_doc_loader = false;
}

sendmediamessage(message : any,type:any) {

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
  this.socket.emit('new_message_customer', {
      "room_id": "RAMS_SRC_" + userinfo['cstm_id']+"_" +this.request_details['serm_id'],
      "user": userinfo['cstm_name'],
      "message": message,
      "time": new Date().toISOString().slice(0, 19).replace('T', ' '),
      "usertyp": 1,
      "sc_message_type":type
  });
  this.scrollToBottom();
}
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

}
