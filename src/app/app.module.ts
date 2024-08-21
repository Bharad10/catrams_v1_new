import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';


import { HttpLoaderFactory } from 'src/app.translate-loader';


//Routes
import { routes } from './app.route';



import { AppComponent } from './app.component';

// service
import { AppService } from './service/app.service';

// store
import { StoreModule } from '@ngrx/store'
import { indexReducer } from './store/index.reducer';

// i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// headlessui
import { MenuModule } from 'headlessui-angular';

// perfect-scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

// dashboard
import { IndexComponent } from './index';

//datatable
import { DataTableModule } from '@bhplugin/ng-datatable';
//apexchart
import { NgApexchartsModule } from 'ng-apexcharts';

//alerts
import { SweetAlertArrayOptions } from 'sweetalert2';

//modal
import { ModalModule } from 'angular-custom-modal';


//CALENDR
import { FullCalendarModule } from '@fullcalendar/angular';


//store
import { Store } from '@ngrx/store';
// import { SwiperModule } from 'swiper/types/shared';
//lightbox
import { LightboxModule } from 'ngx-lightbox';
// import { Fancybox } from "@fancyapps/ui";
//progressbar
// import { ProgressBarModule } from "angular-progress-bar";


import { NgxTippyModule } from 'ngx-tippy-wrapper';




import { IvyCarouselModule } from 'angular-responsive-carousel';
import { DatePipe } from '@angular/common';

// Layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

import { HeaderComponent } from './layouts/header';
import { FooterComponent } from './layouts/footer';
import { SidebarComponent } from './layouts/sidebar';
import { ThemeCustomizerComponent } from './layouts/theme-customizer';
import { LoginComponentComponent } from './auth_module/login-component/login-component.component';
import { SignupComponentComponent } from './auth_module/signup-component/signup-component.component';
import { DashboardComponentComponent } from './rams_module/dashboard-component/dashboard-component.component';
import { UserCreateComponent } from './rams_module/user_master/user-create/user-create.component';
import { UserListComponent } from './rams_module/user_master/user-list/user-list.component';
import { UserEditComponent } from './rams_module/user_master/user-edit/user-edit.component';
import { ServiceReqListComponent } from './rams_module/service_request/service-req-list/service-req-list.component';
import { QuotationEditModuleComponent } from './rams_module/Quotation-module/quotation-edit-module/quotation-edit-module.component';
import { WorkCardEditModuleComponent } from './rams_module/work_card_module/work-card-edit/work-card-edit-module/work-card-edit-module.component';
import { ServiceRequestHistoryComponent } from './rams_module/service_request/service-request-history/service-request-history.component';
import { ServiceHistoryDetailsComponent } from './rams_module/service_request/service-history-details/service-history-details.component';
import { UserRoleSettingsComponent } from './rams_module/admin-settings/user_role/user-role-settings/user-role-settings.component';

import { UserRoleAddComponent } from './rams_module/admin-settings/user_role/user-role-add/user-role-add.component';
import { UserRoleEditComponent } from './rams_module/admin-settings/user_role/user-role-edit/user-role-edit.component';
import { QuotationCreateModuleComponent } from './rams_module/Quotation-module/quotation-create-module/quotation-create-module.component';
import { QuotationListModuleComponent } from './rams_module/Quotation-module/quotation-list-module/quotation-list-module.component';
import { ToolListModuleComponent } from './rams_module/packages/Tools/tool-list-module/tool-list-module.component';
import { ToolCreateModuleComponent } from './rams_module/packages/Tools/tool-create-module/tool-create-module.component';
import { ToolEditModuleComponent } from './rams_module/packages/Tools/tool-edit-module/tool-edit-module.component';
import { ToolRequestListComponent } from './rams_module/tool_request/tool-request-list/tool-request-list.component';
import { WorkCardCreateComponent } from './rams_module/work_card_module/work-card-create/work-card-create.component';
import { WorkCardListComponent } from './rams_module/work_card_module/work-card-list/work-card-list.component';
import { ToolRequestPageComponent } from './rams_module/tool_request/tool-request-page/tool-request-page.component';
import { ToolRequestHistoryComponent } from './rams_module/tool_request/tool-request-history/tool-request-history.component';
import { ToolRequestDetailsComponent } from './rams_module/tool_request/tool-request-details/tool-request-details.component';
import { ToolRequestEditComponent } from './rams_module/tool_request/tool-request-edit/tool-request-edit.component';
import { ServiceRequestDetailsComponent } from './rams_module/service_request/service-request-details/service-request-details.component';
import { CustomerListPageComponent } from './rams_module/customer/customer-list-page/customer-list-page.component';
import { CustomerCreatePageComponent } from './rams_module/customer/customer-create-page/customer-create-page.component';
import { CustomerEditPageComponent } from './rams_module/customer/customer-edit-page/customer-edit-page.component';
import { UserEditPageComponent } from './rams_module/user-list/user-edit-page/user-edit-page.component';
import { UserCreatePageComponent } from './rams_module/user-list/user-create-page/user-create-page.component';
import { UserListPageComponent } from './rams_module/user-list/user-list-page/user-list-page.component';
import { ToolInspectionListComponent } from './rams_module/tool_inspection/tool-inspection-list/tool-inspection-list.component';
import { ToolInspectionCheckComponent } from './rams_module/tool_inspection/tool-inspection-check/tool-inspection-check.component';
import { ServiceCreateModuleComponent } from './rams_module/packages/Services/service-create-module/service-create-module.component';
import { ServiceListModuleComponent } from './rams_module/packages/Services/service-list-module/service-list-module.component';
import { ServiceEditModuleComponent } from './rams_module/packages/Services/service-edit-module/service-edit-module.component';
import { CouponListComponent } from './rams_module/admin-settings/coupon/coupon-list/coupon-list.component';
import { CouponCreateComponent } from './rams_module/admin-settings/coupon/coupon-create/coupon-create.component';
import { CouponEditComponent } from './rams_module/admin-settings/coupon/coupon-edit/coupon-edit.component';
import { CouponHistoryListComponent } from './rams_module/admin-settings/coupon/coupon-history-list/coupon-history-list.component';
import { ProfileViewComponent } from './rams_module/profile_settings/profile-view/profile-view.component';
import { ProfileEditComponent } from './rams_module/profile_settings/profile-edit/profile-edit.component';
import { DeletedToolsModuleComponent } from './rams_module/packages/Tools/deleted-tools-module/deleted-tools-module.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AdminApprovalComponent } from './rams_module/admin-settings/admin-approval/admin-approval.component';
import { PaymentModuleComponent } from './rams_module/admin-settings/Payment-Module/payment-module-Settings/payment-module.component';
import { PaymentModuleDetailsComponent } from './rams_module/admin-settings/Payment-Module/payment-module-details/payment-module-details.component';
import { BannerModuleComponent } from './rams_module/admin-settings/banner-module/banner-settings-module/banner-module.component';
import { BannerEditComponent } from './rams_module/admin-settings/banner-module/banner-edit/banner-edit.component';
import { BannerCreateComponent } from './rams_module/admin-settings/banner-module/banner-create/banner-create.component';
import { InventoryListModuleComponent } from './rams_module/Inventory/inventory-list-module/inventory-list-module.component';
import { InventoryEditModuleComponent } from './rams_module/Inventory/inventory-edit-module/inventory-edit-module.component';
import { StopwatchComponent } from './rams_module/work_card_module/stopwatch/stopwatch.component';
import { ToolSaleComponent } from './rams_module/tool_request/tool-sale/tool-sale.component';
import { ToolSaleDetailsComponent } from './rams_module/tool_request/tool-sale-details/tool-sale-details.component';
import { AdditionalChargesSettingsComponent } from './rams_module/admin-settings/additional-charges-module/additional-charges-settings/additional-charges-settings.component';
import { AdditionalChargesEditComponent } from './rams_module/admin-settings/additional-charges-module/additional-charges-edit/additional-charges-edit.component';
import { AdditionalChargesCreateComponent } from './rams_module/admin-settings/additional-charges-module/additional-charges-create/additional-charges-create.component';
import { VendorManagementSettingsComponent } from './rams_module/admin-settings/vendor-management/vendor-management-settings/vendor-management-settings.component';
import { VendorDetailsComponent } from './rams_module/admin-settings/vendor-management/vendor-details/vendor-details.component';

import { initializeApp } from "firebase/app";
import { CustomerSettingsComponent } from './rams_module/admin-settings/customer-settings/customer-settings-list/customer-settings.component';
import { CustomerSettingsCreateComponent } from './rams_module/admin-settings/customer-settings/customer-settings-create/customer-settings-create/customer-settings-create.component';
import { WorkcardSettingsModuleComponent } from './rams_module/admin-settings/workcard-settings/workcard-settings-module/workcard-settings-module.component';
import { ChatmoduleComponent } from './rams_module/chat_module/chatmodule/chatmodule.component';
import { DataCardModuleComponent } from './rams_module/data-card-module/data-card-list/data-card-module.component';
import { DataCardDetailsComponent } from './rams_module/data-card-module/data-card-details/data-card-details.component';
import { ServiceRequestCreateComponent } from './rams_module/service_request/service-request-create/service-request-create.component';
import { ToolSaleHistoryComponent } from './rams_module/tool_request/tool-sale-history/tool-sale-history.component';
import { ServiceRequestSettingsComponent } from './rams_module/service_request/service-request-settings/service-request-settings.component';
import { DashboardDueTicketsComponent } from './rams_module/dashboard/dashboard-due-tickets/dashboard-due-tickets.component';
import { DashboardTotalStatComponent } from './rams_module/dashboard/dashboard-total-stat/dashboard-total-stat.component';
import { DashboardNewTicketsComponent } from './rams_module/dashboard/dashboard-new-tickets/dashboard-new-tickets.component';
import { WorkCardViewCustomerDetailsComponent } from './rams_module/work_card_module/work-card-edit/work-card-edit-view/work-card-view-customer-details/work-card-view-customer-details.component';
import { WorkCardViewServiceDetailsComponent } from './rams_module/work_card_module/work-card-edit/work-card-edit-view/work-card-view-service-details/work-card-view-service-details.component';
import { WorkCardViewWorkStatusComponent } from './rams_module/work_card_module/work-card-edit/work-card-edit-view/work-card-view-work-status/work-card-view-work-status.component';
import { AuthPrivacyPolicyComponent } from './auth_module/privacy-policy/auth-privacy-policy/auth-privacy-policy.component';
import { NgSelectModule } from '@ng-select/ng-select';




// import { AngularFireModule } from "@angular/fire/compat";

// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

initializeApp(environment.firebaseConfig);
registerLocaleData(localeAr);
// initializeApp(environment.firebase);

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true }),
        //  AngularFireModule.initializeApp(environment.firebaseConfig),
        BrowserModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MenuModule,
        DataTableModule,
        NgApexchartsModule,
        LightboxModule,
        AutocompleteLibModule,
        ModalModule,
        NgxTippyModule,
        FullCalendarModule ,
        NgSelectModule,
        
        // NgMultiSelectDropDownModule,
        
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        StoreModule.forRoot({ index: indexReducer }),
        NgScrollbarModule.withConfig({
            visibility: 'hover',
            appearance: 'standard',
        }),
        
    ],
    declarations: [AppComponent, HeaderComponent, FooterComponent, SidebarComponent, ThemeCustomizerComponent, IndexComponent, AppLayout, AuthLayout, LoginComponentComponent, SignupComponentComponent, DashboardComponentComponent, UserCreateComponent, UserListComponent, UserEditComponent, ServiceReqListComponent, QuotationEditModuleComponent, WorkCardEditModuleComponent, ServiceRequestHistoryComponent, ServiceHistoryDetailsComponent, UserRoleSettingsComponent, UserRoleAddComponent, UserRoleEditComponent, QuotationCreateModuleComponent, QuotationListModuleComponent, ToolListModuleComponent, ToolCreateModuleComponent, ToolEditModuleComponent, ToolRequestListComponent, WorkCardCreateComponent, WorkCardListComponent, ToolRequestPageComponent, ToolRequestHistoryComponent, ToolRequestDetailsComponent, ToolRequestEditComponent, ServiceRequestDetailsComponent, CustomerListPageComponent, CustomerCreatePageComponent, CustomerEditPageComponent, UserEditPageComponent, UserCreatePageComponent, UserListPageComponent, ToolInspectionListComponent, ToolInspectionCheckComponent, ServiceCreateModuleComponent, ServiceListModuleComponent, ServiceEditModuleComponent, CouponListComponent, CouponCreateComponent, CouponEditComponent, CouponHistoryListComponent, ProfileViewComponent, ProfileEditComponent, DeletedToolsModuleComponent, AdminApprovalComponent, PaymentModuleComponent, PaymentModuleDetailsComponent, BannerModuleComponent, BannerEditComponent, BannerCreateComponent, InventoryListModuleComponent, InventoryEditModuleComponent, StopwatchComponent, ToolSaleComponent, ToolSaleDetailsComponent, AdditionalChargesSettingsComponent, AdditionalChargesEditComponent, AdditionalChargesCreateComponent, VendorManagementSettingsComponent, VendorDetailsComponent, CustomerSettingsComponent, CustomerSettingsCreateComponent, WorkcardSettingsModuleComponent, ChatmoduleComponent, DataCardModuleComponent, DataCardDetailsComponent, ServiceRequestCreateComponent, ToolSaleHistoryComponent, ServiceRequestSettingsComponent, DashboardDueTicketsComponent, DashboardTotalStatComponent, DashboardNewTicketsComponent, WorkCardViewCustomerDetailsComponent, WorkCardViewServiceDetailsComponent, WorkCardViewWorkStatusComponent, AuthPrivacyPolicyComponent],
    providers: [AppService, Title,DatePipe],
    bootstrap: [AppComponent],
})

export class AppModule {

    
 }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
