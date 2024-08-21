import { Component, OnInit } from '@angular/core';
import { FormBuilder, } from '@angular/forms';

@Component({
  selector: 'app-service-request-settings',
  templateUrl: './service-request-settings.component.html',
  styleUrls: ['./service-request-settings.component.css']
})
export class ServiceRequestSettingsComponent {
  selectedTab = 'sList';
  isShowTaskMenu = false;
  searchTask = '';
  compList: any[] = [];
  constructor(
    public fb: FormBuilder) { }

  ngOnInit() {
      this.getAllCompanyList();
  }

  tabChanged(type: any = null) {
      this.selectedTab = type;
      this.isShowTaskMenu = false;
  }
  getAllCompanyList() {
      
    }
}


