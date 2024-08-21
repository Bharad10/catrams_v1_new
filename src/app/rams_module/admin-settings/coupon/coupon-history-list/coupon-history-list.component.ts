import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupon-history-list',
  templateUrl: './coupon-history-list.component.html',
  styleUrls: ['./coupon-history-list.component.css']
})
export class CouponHistoryListComponent {
  constructor(private router: Router) { }
  search = '';
  datatable1Cols = [
    { field: 'customerName', title: 'Customer Name' },
    { field: 'couponCode', title: 'Coupon Code' },
    { field: 'couponType', title: 'Coupon Type' },
    { field: 'couponDescription', title: 'Coupon Description' },
  ];

  rows = [
    {
      id: 1,
      customerName: 'Customer 1',
      couponCode: 'Welcome 50',
      couponType: 'Customer Type',
      couponDescription: 'Greetings',
    },
    {
      id: 2,
      customerName: 'Customer 2',
      couponCode: 'Eid 25',
      couponType: 'Festival Type',
      couponDescription: 'Festival Specified',
    },
  ];

  ngOnInit() {
  }

}

