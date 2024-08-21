import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user-service/user.service';
@Component({
  selector: 'app-dashboard-due-tickets',
  templateUrl: './dashboard-due-tickets.component.html',
  styleUrls: ['./dashboard-due-tickets.component.css']
})
export class DashboardDueTicketsComponent {
  @Input()rows : any[] = [];
  cols:any=[];
  search=''
  constructor(public storeData: Store<any>,
    private usr_serv:UserService,
    private router:Router,
    public fb: FormBuilder,
    private translate: TranslateService){

      this.translate.get([
        'Request Number',
        'Customer Name',
        'Status'
      ]).subscribe(translations => {
        this.cols = [
          { field: 'tldt_number', title: translations['Request Number'] },
          { field: 'cstm_name', title: translations['Customer Name'] },
          { field: 'status',sort: false, title: translations['Status'] }
        ];
      });
  }

  tooledit(id: any) {
    this.router.navigateByUrl('tool-request-edit/' + (btoa(id)));
}
  
}
