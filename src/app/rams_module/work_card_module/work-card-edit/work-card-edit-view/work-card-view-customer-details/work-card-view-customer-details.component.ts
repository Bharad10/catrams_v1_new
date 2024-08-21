
import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-work-card-view-customer-details',
  templateUrl: './work-card-view-customer-details.component.html',
  styleUrls: ['./work-card-view-customer-details.component.css']
})
export class WorkCardViewCustomerDetailsComponent {
  @Input()request_details : any = [];
}
