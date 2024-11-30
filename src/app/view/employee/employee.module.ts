import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PaycheckDetailComponent } from './paycheck-detail/paycheck-detail.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    ProfileComponent,
    PaycheckComponent,
    WorkComponent,
    PaycheckDetailComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    InputNumberModule,
    AvatarModule,
    TabViewModule,
    SharedModule,
    DialogModule,
    CalendarModule,
    DropdownModule,
    InputSwitchModule,
    TooltipModule
  ],
  providers:[ConfirmationService]
})
export class EmployeeModule { }
