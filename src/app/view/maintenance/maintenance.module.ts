import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { MaintenanceDetailComponent } from './maintenance-detail/maintenance-detail.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    MaintenanceListComponent,
    MaintenanceDetailComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextModule
  ],
  providers:[ConfirmationService]
})
export class MaintenanceModule { }
