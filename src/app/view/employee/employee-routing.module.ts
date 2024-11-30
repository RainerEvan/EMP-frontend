import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { PaycheckDetailComponent } from './paycheck-detail/paycheck-detail.component';

const routes: Routes = [
  { 
    path: '', 
    component: EmployeeListComponent 
  },
  { 
    path: ':id', 
    component: EmployeeDetailComponent 
  },
  { 
    path: ':employeeId/paycheck/:paycheckId', 
    component: PaycheckDetailComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
