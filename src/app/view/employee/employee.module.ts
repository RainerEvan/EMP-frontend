import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { TabViewModule } from 'primeng/tabview';
import { ProfileComponent } from './profile/profile.component';
import { PaycheckComponent } from './paycheck/paycheck.component';
import { WorkComponent } from './work/work.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    ProfileComponent,
    PaycheckComponent,
    WorkComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    AvatarModule,
    TabViewModule
  ],
  providers:[ConfirmationService]
})
export class EmployeeModule { }
