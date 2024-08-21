import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-dashboard-new-tickets',
  templateUrl: './dashboard-new-tickets.component.html',
  styleUrls: ['./dashboard-new-tickets.component.css']
})
export class DashboardNewTicketsComponent {

  constructor(public storeData: Store<any>,
    private usr_serv:UserService,
    private router:Router,
    public fb: FormBuilder,
    private translate: TranslateService) {
       

    
    

    
}
  @Input()open_tickets : any[] = [];

  servreq(srid:any){
    this.router.navigateByUrl('service-request-details/' + (btoa(srid)));
}
toolreq(){
    this.router.navigateByUrl('tool-request-list');
}
tooledit(id: any) {
    this.router.navigateByUrl('tool-request-edit/' + (btoa(id)));
}
}
