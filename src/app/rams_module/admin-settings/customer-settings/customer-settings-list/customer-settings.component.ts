import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-settings',
  templateUrl: './customer-settings.component.html',
  styleUrls: ['./customer-settings.component.css']
})
export class CustomerSettingsComponent implements OnInit {
  cust_list: any;
  discount_data:any;
  loading=true;
  total_cust=0;
  total_pmcust=0;
  total_nonpmcust=0;
  rows: any;
  cust_Date: any;
  salesByCategory: any;
  
  constructor(private set_serv: SettingsService,
    private router:Router) {


}
loadActiveRequestGraph() {

  this.salesByCategory = {
      chart: {
          type: 'donut',
          height: 400,
          fontFamily: 'system-ui',
      },
      dataLabels: {
          enabled: false,
      },
      stroke: {
          show: true,
          width: 25,
      },
      fill: {
        type: "gradient"
      },
      colors:  ['#FFA400', '#009FFD'],
      legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '14px',
          markers: {
              width: 10,
              height: 10,
              offsetX: -2,
          },
          height: 50,
          offsetY: 20,
          color:  undefined,
          
      },
      plotOptions: {
          pie: {
              donut: {
                  size: '55%',
                  background: 'transparent',
                  labels: {
                      show: true,
                      name: {
                          show: true,
                          fontSize: '29px',
                          offsetY: -10,
                      },
                      value: {
                          show: true,
                          fontSize: '26px',
                          color:  undefined,
                          offsetY: 16,
                          formatter: (val: any) => {
                              return val;
                          },
                      },
                      total: {
                          show: true,
                          label: 'Total Customers',
                          color: '#888ea8',
                          fontSize: '20px',
                          formatter: (w: any) => {
                              return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                  return a + b;
                              }, 0);
                          },
                      },
                  },
              },
          },
      },
      labels: ['Non Premium','Premium'],
      series: [this.total_nonpmcust ,this.total_pmcust],
      states: {
          hover: {
              filter: {
                  type: 'none',
                  value: 0.15,
              },
          },
          active: {
              filter: {
                  type: 'none',
                  value: 0.15,
              },
          },
      },

  };
}
  ngOnInit(): void {
    
    this.set_serv.premium_list().subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.cust_list = rdata.cust_list
        this.discount_data=rdata.discount_data
        this.rows=this.discount_data
        
        setTimeout(() => {
          this.loading =  false;  
        }, 1300);
      
        
       
        this.total_cust=rdata.length_data['total_cust'];
        this.total_pmcust=rdata.length_data['total_pmcust'];
        this.total_nonpmcust=this.total_cust-this.total_pmcust;
        this.loadActiveRequestGraph()

      } else {
        this.rows = rdata.flag;
        setTimeout(() => {
          this.loading =  false
        }, 1300);
      }
    });
  }

  cols = [
    { field: 'type', title: 'Rate Type' },
    { field: 'rate', title: 'Rate' },
    { field: 'request_type', title: 'Request' },
    { field: 'created_on', title: 'Created On' },
    { field: 'created_by', title: 'Created By' },
    { field: 'Action', title: 'Action' },

  ];

  colscust=[
    { field: 'cust_name', title: 'Customer Name' },
    { field: 'p_number', title: 'Contact' },
    { field: 'gstin', title: 'GSTIN' },
    { field: 'created_on', title: 'Enrolled On' },
    { field: 'Action', title: 'Action' }, 
  ]


  adminsettings(){
    this.router.navigateByUrl('admin-approval');
  }

  deletedisc(id:any){

  }

  date( date:any){
    this.cust_Date= moment(date, 'DD-MM-YYYY').format("YYYY-MM-DD")
  }
  disc_create(){
    this.router.navigateByUrl('discount-create')
  }

  set_active_status(id:any){
    const data={
      'cd_id':id,
      'discount_data':this.discount_data
    }
    this.set_serv.set_active_status(data).subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        this.showMessage('Status Changed.', 'success');
          setTimeout(() => window.location.reload(), 500);
      } 
      else{
        this.showMessage(rdata.Message, 'error');
      }
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

editcustomer(data:any) {
    this.router.navigateByUrl('/customer-edit/' + (btoa(data)));
 }

}
