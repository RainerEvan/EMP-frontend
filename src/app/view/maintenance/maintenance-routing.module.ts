import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { MaintenanceDetailComponent } from './maintenance-detail/maintenance-detail.component';

const routes: Routes = [
  { 
    path: '', 
    component: MaintenanceListComponent 
  },
  { 
    path: ':id', 
    component: MaintenanceDetailComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
