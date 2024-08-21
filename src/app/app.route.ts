import { Routes } from '@angular/router';

// dashboard
import { IndexComponent } from './index';
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';
import { LoginComponentComponent } from './auth_module/login-component/login-component.component';
import { DashboardComponentComponent } from './rams_module/dashboard-component/dashboard-component.component';
import { ServiceReqListComponent } from './rams_module/service_request/service-req-list/service-req-list.component';
import { QuotationListModuleComponent } from './rams_module/Quotation-module/quotation-list-module/quotation-list-module.component';
import { QuotationEditModuleComponent } from './rams_module/Quotation-module/quotation-edit-module/quotation-edit-module.component';
import { QuotationCreateModuleComponent } from './rams_module/Quotation-module/quotation-create-module/quotation-create-module.component';
import { WorkCardEditModuleComponent } from './rams_module/work_card_module/work-card-edit/work-card-edit-module/work-card-edit-module.component';
import { WorkCardListComponent } from './rams_module/work_card_module/work-card-list/work-card-list.component';
import { WorkCardCreateComponent } from './rams_module/work_card_module/work-card-create/work-card-create.component';
import { ServiceRequestHistoryComponent } from './rams_module/service_request/service-request-history/service-request-history.component';
import { ServiceHistoryDetailsComponent } from './rams_module/service_request/service-history-details/service-history-details.component';
import { ServiceRequestDetailsComponent } from './rams_module/service_request/service-request-details/service-request-details.component';
import { UserRoleSettingsComponent } from './rams_module/admin-settings/user_role/user-role-settings/user-role-settings.component';
import { UserRoleAddComponent } from './rams_module/admin-settings/user_role/user-role-add/user-role-add.component';
import { UserRoleEditComponent } from './rams_module/admin-settings/user_role/user-role-edit/user-role-edit.component';
import { ToolListModuleComponent } from './rams_module/packages/Tools/tool-list-module/tool-list-module.component';
import { ToolCreateModuleComponent } from './rams_module/packages/Tools/tool-create-module/tool-create-module.component';
import { ToolEditModuleComponent } from './rams_module/packages/Tools/tool-edit-module/tool-edit-module.component';
import { ToolRequestListComponent } from './rams_module/tool_request/tool-request-list/tool-request-list.component';
import { ToolRequestPageComponent } from './rams_module/tool_request/tool-request-page/tool-request-page.component';
import { ToolRequestHistoryComponent } from './rams_module/tool_request/tool-request-history/tool-request-history.component';
import { ToolRequestDetailsComponent } from './rams_module/tool_request/tool-request-details/tool-request-details.component';
import { ToolRequestEditComponent } from './rams_module/tool_request/tool-request-edit/tool-request-edit.component';
import { CustomerListPageComponent } from './rams_module/customer/customer-list-page/customer-list-page.component';
import { CustomerCreatePageComponent } from './rams_module/customer/customer-create-page/customer-create-page.component';
import { CustomerEditPageComponent } from './rams_module/customer/customer-edit-page/customer-edit-page.component';
import { UserListPageComponent } from './rams_module/user-list/user-list-page/user-list-page.component';
import { UserCreatePageComponent } from './rams_module/user-list/user-create-page/user-create-page.component'; 
import { UserEditPageComponent } from './rams_module/user-list/user-edit-page/user-edit-page.component'; 
import { ToolInspectionListComponent } from './rams_module/tool_inspection/tool-inspection-list/tool-inspection-list.component'; 
import { ToolInspectionCheckComponent } from './rams_module/tool_inspection/tool-inspection-check/tool-inspection-check.component';
import { ServiceCreateModuleComponent } from './rams_module/packages/Services/service-create-module/service-create-module.component';
import { ServiceEditModuleComponent } from './rams_module/packages/Services/service-edit-module/service-edit-module.component';
import { ServiceListModuleComponent } from './rams_module/packages/Services/service-list-module/service-list-module.component';
import { CouponCreateComponent } from './rams_module/admin-settings/coupon/coupon-create/coupon-create.component';
import { CouponEditComponent } from './rams_module/admin-settings/coupon/coupon-edit/coupon-edit.component';
import { CouponListComponent } from './rams_module/admin-settings/coupon/coupon-list/coupon-list.component';
import { CouponHistoryListComponent } from './rams_module/admin-settings/coupon/coupon-history-list/coupon-history-list.component';
import { ProfileViewComponent } from './rams_module/profile_settings/profile-view/profile-view.component';
import { ProfileEditComponent } from './rams_module/profile_settings/profile-edit/profile-edit.component';
import { DeletedToolsModuleComponent } from './rams_module/packages/Tools/deleted-tools-module/deleted-tools-module.component';
import { AdminApprovalComponent } from './rams_module/admin-settings/admin-approval/admin-approval.component';
import { PaymentModuleComponent } from './rams_module/admin-settings/Payment-Module/payment-module-Settings/payment-module.component';
import { PaymentModuleDetailsComponent } from './rams_module/admin-settings/Payment-Module/payment-module-details/payment-module-details.component';
import { BannerModuleComponent } from './rams_module/admin-settings/banner-module/banner-settings-module/banner-module.component';
import { BannerCreateComponent } from './rams_module/admin-settings/banner-module/banner-create/banner-create.component';
import { BannerEditComponent } from './rams_module/admin-settings/banner-module/banner-edit/banner-edit.component';
import { InventoryListModuleComponent } from './rams_module/Inventory/inventory-list-module/inventory-list-module.component';
import { InventoryEditModuleComponent } from './rams_module/Inventory/inventory-edit-module/inventory-edit-module.component';
import { ToolSaleComponent } from './rams_module/tool_request/tool-sale/tool-sale.component';
import { ToolSaleDetailsComponent } from './rams_module/tool_request/tool-sale-details/tool-sale-details.component';
import { AdditionalChargesSettingsComponent } from './rams_module/admin-settings/additional-charges-module/additional-charges-settings/additional-charges-settings.component';
import { AdditionalChargesEditComponent } from './rams_module/admin-settings/additional-charges-module/additional-charges-edit/additional-charges-edit.component';
import { AdditionalChargesCreateComponent } from './rams_module/admin-settings/additional-charges-module/additional-charges-create/additional-charges-create.component';
import { VendorManagementSettingsComponent } from './rams_module/admin-settings/vendor-management/vendor-management-settings/vendor-management-settings.component';
import { VendorDetailsComponent } from './rams_module/admin-settings/vendor-management/vendor-details/vendor-details.component';
import { CustomerSettingsComponent } from './rams_module/admin-settings/customer-settings/customer-settings-list/customer-settings.component';
import { CustomerSettingsCreateComponent } from './rams_module/admin-settings/customer-settings/customer-settings-create/customer-settings-create/customer-settings-create.component';
import { WorkcardSettingsModuleComponent } from './rams_module/admin-settings/workcard-settings/workcard-settings-module/workcard-settings-module.component';
import { ChatmoduleComponent } from './rams_module/chat_module/chatmodule/chatmodule.component';
import { DataCardModuleComponent } from './rams_module/data-card-module/data-card-list/data-card-module.component';
import { DataCardDetailsComponent } from './rams_module/data-card-module/data-card-details/data-card-details.component';
import { ServiceRequestCreateComponent } from './rams_module/service_request/service-request-create/service-request-create.component';
import { ToolSaleHistoryComponent } from './rams_module/tool_request/tool-sale-history/tool-sale-history.component';
import { ServiceRequestSettingsComponent } from './rams_module/service_request/service-request-settings/service-request-settings.component';
import { AuthPrivacyPolicyComponent } from './auth_module/privacy-policy/auth-privacy-policy/auth-privacy-policy.component';

export const routes: Routes = [
    

    {
        path: '',
        component: AuthLayout,
        children: [
            { path: '', component: LoginComponentComponent, title: 'RAMS' },
            { path: 'privacy-policy', component: AuthPrivacyPolicyComponent, title: 'RAMS' },

        ],
    },

    {
        path: '',
        component: AppLayout,
        children: [
            // dashboard
            // { path: '', component: IndexComponent, title: 'RAMS' },
            
            { path: 'dashboard', component: DashboardComponentComponent, title: 'RAMS' },
            { path: 'service-request-list', component: ServiceReqListComponent, title: 'RAMS' },
            { path: 'quotation-request-list', component: QuotationListModuleComponent, title: 'RAMS'},
            { path: 'quotation-edit/:id/:qid', component: QuotationEditModuleComponent, title: 'RAMS' },
            { path: 'quotation-create/:id/:qid', component: QuotationCreateModuleComponent, title:'RAMS' },
            { path: 'tool-package-list', component: ToolListModuleComponent, title:'RAMS' },
            { path: 'tool-package-create', component: ToolCreateModuleComponent, title:'RAMS' },
            { path: 'tool-package-edit/:id', component: ToolEditModuleComponent, title:'RAMS' },
            { path: 'work-card-edit/:id', component: WorkCardEditModuleComponent, title: 'RAMS' },
            { path: 'work-card-list', component: WorkCardListComponent, title: 'RAMS' },
            { path: 'work-card-create/:id', component: WorkCardCreateComponent, title: 'RAMS' },  
            { path: 'service-request-history', component: ServiceRequestHistoryComponent, title: 'RAMS' },
            { path: 'service-history-details/:id', component: ServiceHistoryDetailsComponent, title: 'RAMS' },
            { path: 'service-request-details/:id', component: ServiceRequestDetailsComponent, title: 'RAMS' },
            { path: 'user-role-settings', component: UserRoleSettingsComponent, title: 'RAMS' },
            { path: 'user-role-add', component: UserRoleAddComponent, title: 'RAMS' },  
            { path: 'user-role-edit/:id', component: UserRoleEditComponent, title: 'RAMS' },
            { path: 'tool-request-list', component: ToolRequestListComponent, title: 'RAMS' },
            { path: 'tool-sale', component: ToolSaleComponent, title: 'RAMS' },
            { path: 'tool-sale-details/:id', component: ToolSaleDetailsComponent, title: 'RAMS' },
            { path: 'tool-request-history', component: ToolRequestHistoryComponent, title: 'RAMS' },
            { path: 'tool-request-page', component: ToolRequestPageComponent, title: 'RAMS' },
            { path: 'tool-request-detail/:id', component: ToolRequestDetailsComponent, title: 'RAMS' },
            { path: 'tool-request-edit/:id', component: ToolRequestEditComponent, title: 'RAMS' },
            { path: 'customer-edit/:id', component: CustomerEditPageComponent, title: 'RAMS' },
            { path: 'customer-list', component: CustomerListPageComponent, title: 'RAMS' },
            { path: 'customer-create', component: CustomerCreatePageComponent, title: 'RAMS' },
            { path: 'user-edit/:id', component: UserEditPageComponent, title: 'RAMS' },
            { path: 'user-list', component: UserListPageComponent, title: 'RAMS' },
            { path: 'user-create', component: UserCreatePageComponent, title: 'RAMS' },
            { path: 'tool-inspection-list', component: ToolInspectionListComponent, title: 'RAMS' },
            { path: 'tool-inspection-check/:id', component: ToolInspectionCheckComponent, title: 'RAMS' },        
            { path: 'service-package-create', component: ServiceCreateModuleComponent, title: 'RAMS' },        
            { path: 'service-package-edit/:id', component: ServiceEditModuleComponent, title: 'RAMS' },        
            { path: 'service-package-list', component: ServiceListModuleComponent, title: 'RAMS' },
            { path: 'coupon-edit/:id', component: CouponEditComponent, title: 'RAMS' },
            { path: 'coupon-list', component: CouponListComponent, title: 'RAMS' },
            { path: 'coupon-create', component: CouponCreateComponent, title: 'RAMS' }, 
            { path: 'coupon-history-list', component: CouponHistoryListComponent, title: 'RAMS' },
            { path: 'profile-view', component: ProfileViewComponent, title: 'RAMS' }, 
            { path: 'profile-edit/:id', component: ProfileEditComponent, title: 'RAMS' },        
            { path: 'deleted-tool-package/:id', component: DeletedToolsModuleComponent, title: 'RAMS' },  
            { path: 'admin-approval', component: AdminApprovalComponent, title: 'RAMS' },
            { path: 'admin-payment', component: PaymentModuleComponent, title: 'RAMS' },
            { path: 'payment-details', component: PaymentModuleDetailsComponent, title: 'RAMS' },
            { path: 'banner-module', component: BannerModuleComponent, title: 'RAMS' },
            { path: 'banner-create', component: BannerCreateComponent, title: 'RAMS' },
            { path: 'banner-edit', component: InventoryListModuleComponent, title: 'RAMS' },
            { path: 'inventory-list', component: InventoryListModuleComponent, title: 'RAMS' },
            { path: 'inventory-edit/:id', component: InventoryEditModuleComponent, title: 'RAMS' },
            { path: 'expense-settings', component: AdditionalChargesSettingsComponent, title: 'RAMS' },
            { path: 'expense-edit/:id', component: AdditionalChargesEditComponent, title: 'RAMS' },
            { path: 'expense-create', component: AdditionalChargesCreateComponent, title: 'RAMS' },
            { path: 'expert-settings', component: VendorManagementSettingsComponent, title: 'RAMS' },
            { path: 'expert-details/:id', component: VendorDetailsComponent, title: 'RAMS' },
            { path: 'customer-settings', component: CustomerSettingsComponent, title: 'RAMS' },
            { path: 'discount-create', component: CustomerSettingsCreateComponent, title: 'RAMS' },
            { path: 'workcard-settings', component: WorkcardSettingsModuleComponent, title: 'RAMS' },
            { path: 'chat-home', component: ChatmoduleComponent, title: 'RAMS' },
            { path: 'data-card-module', component: DataCardModuleComponent, title: 'RAMS' },
            { path: 'data-card-details/:id', component: DataCardDetailsComponent, title: 'RAMS' },
            { path: 'service-request-create', component: ServiceRequestCreateComponent, title: 'RAMS' },
            { path: 'tool-sale-history', component: ToolSaleHistoryComponent, title: 'RAMS' },
            // { path: 'service-request-settings', component: ServiceRequestSettingsComponent, title: 'RAMS' }
            







                       


        ],
    },
];
