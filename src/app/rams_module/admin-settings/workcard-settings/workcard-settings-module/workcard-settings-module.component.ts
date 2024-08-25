import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-workcard-settings-module',
  templateUrl: './workcard-settings-module.component.html',
  styleUrls: ['./workcard-settings-module.component.css']
})
export class WorkcardSettingsModuleComponent implements OnInit {
  loading=true;
  tab6 = 'home'
  days=0;
  setlist:any;
  constructor(
    private set_serv:SettingsService,
    private router:Router,

  ){

  }
  ngOnInit() {
    this.set_serv.wk_settlist().subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.setlist=rdata.result
        this.days=this.setlist.ws_rp_days
        
      }
      this.loading=false;
  });
  }

  adminsettings(){
    this.router.navigateByUrl('admin-approval');
  }

  update_days(){
    this.loading=true;
        const days={
          'ws_rp_days':this.days,
          'ws_id': this.setlist.ws_id 
        }
     
    this.set_serv.update_wkset(days).subscribe((rdata: any) => {

      if (rdata.ret_data == 'success') {
        this.days=rdata.result.ws_rp_days
        this.showMessage('Updated','success')
        
      }
      this.loading=false;
  });
  }
  showMessage(msg = '', type='' ) {
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
