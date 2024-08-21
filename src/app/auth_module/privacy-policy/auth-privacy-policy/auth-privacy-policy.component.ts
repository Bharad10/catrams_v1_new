import { Component } from '@angular/core';
import { slideDownUp } from 'src/app/shared/animations';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-auth-privacy-policy',
  templateUrl: './auth-privacy-policy.component.html',
  styleUrls: ['./auth-privacy-policy.component.css'],
  animations: [slideDownUp]
})
export class AuthPrivacyPolicyComponent {
  constructor() {}
  activeTab: any = 'general';
  active1: any = 1;
  active2: any = 1;
  modal = false;
  us_company_name=environment.us_company_name;
  items = [
      {
          src: '/assets/images/knowledge/image-5.jpg',
          title: 'Excessive sugar is harmful',
      },
      {
          src: '/assets/images/knowledge/image-6.jpg',
          title: 'Creative Photography',
      },
      {
          src: '/assets/images/knowledge/image-7.jpg',
          title: 'Plan your next trip',
      },
      {
          src: '/assets/images/knowledge/image-8.jpg',
          title: 'My latest Vlog',
      },
  ];
}
