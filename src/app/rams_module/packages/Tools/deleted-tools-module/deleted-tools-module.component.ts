import { Component } from '@angular/core';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deleted-tools-module',
  templateUrl: './deleted-tools-module.component.html',
  styleUrls: ['./deleted-tools-module.component.css']
})
export class DeletedToolsModuleComponent {
  tool_list: any;

  


constructor(private usr_ser: UserService,
  private router: Router,
  private activerouter: ActivatedRoute,){
  this.usr_ser.tool_list().subscribe((rdata: any) => {
    if (rdata.ret_data == "success") {
      this.tool_list = rdata.tool_list;
      if(this.tool_list){
        
      }
    }
  });

}


}
