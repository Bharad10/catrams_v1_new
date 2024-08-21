import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { slideDownUp } from '../shared/animations';

@Component({
    moduleId: module.id,
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    animations: [slideDownUp],
})
export class SidebarComponent {
    active = false;
    store: any;
    activeDropdown: string[] = [];
    parentDropdown: string = '';
    userfeatures: any;
    side_bar_menu:any=[];
    access_data: any = localStorage.getItem("access_data");

    constructor(public translate: TranslateService, public storeData: Store<any>, public router: Router) {

        this.userfeatures = JSON.parse(
            atob(atob(this.access_data))
          );
        this.initStore();
        this.set_sidebar_menu()        
    }
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    ngOnInit() {
        this.setActiveDropdown();
        
    }

    set_sidebar_menu()
    {
        
        const desiredArrangement = ["2", "3", "20", "18", "4", "19", "17", "11", "6", "7", "5"];


this.userfeatures.sort((a:any, b:any) => {
    return desiredArrangement.indexOf(a.ft_id) - desiredArrangement.indexOf(b.ft_id);
});



    }

    setActiveDropdown() {
        const selector = document.querySelector('.sidebar ul a[routerLink="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }

    toggleMobileMenu() {
        if (window.innerWidth < 1024) {
            this.storeData.dispatch({ type: 'toggleSidebar' });
        }
    }

    toggleAccordion(name: string, parent?: string) {
        if (this.activeDropdown.includes(name)) {
            this.activeDropdown = this.activeDropdown.filter((d) => d !== name);
        } else {
            this.activeDropdown.push(name);
        }
    }

    dashboard(){
        this.router.navigateByUrl('dashboard');
    }
    toolrequestlist(){
        this.router.navigateByUrl('tool-request-list');
    }
    servqlist(){
        this.router.navigateByUrl('service-request-list');
    }
    inventorylist(){
        this.router.navigateByUrl('inventory-list');
    }
}
