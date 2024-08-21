import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-dashboard-total-stat',
  templateUrl: './dashboard-total-stat.component.html',
  styleUrls: ['./dashboard-total-stat.component.css']
})
export class DashboardTotalStatComponent {
  @Input()def_tool : any=[];
  salesByCategory: any;
  store: any;
  isLoading = true;
  constructor(public storeData: Store<any>,
    private usr_serv:UserService,
    private router:Router,
    public fb: FormBuilder,
    private translate: TranslateService
    )
    {

     
     
      this.stat_chart();
      
    }
    

      stat_chart(){
        
        this.salesByCategory = {

          chart: {
              type: 'donut',
              height: 200,
              fontFamily: 'Nunito, sans-serif',
          },
          fill: {
              type: "gradient"
            },
          dataLabels: {
              enabled: false,
          },
  
          stroke: {
              show: true,
              width: 5,
              colors:  '#fff',
          },
  
         
  
          colors: 
           [
              '#ffd46c'
              ,'#d15478'
              ,'#4d7a4d'
          ],
  
          
  
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
          },
  
          plotOptions: {
              pie: {
                  donut: {
                      size: '65%',
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
                              label: 'Total Tickets',
                              color: '#888ea8',
                              fontSize: '12px',
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
  
          labels: ['In Progress', 'Open', 'Closed'],
  
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
          // series: [5,10,11],
  
           series: [this.def_tool.total_pending,this.def_tool.total_open, this.def_tool.total_closed],
          
          
          
      };
      }
    
}
