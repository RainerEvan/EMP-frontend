import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './view/main/main.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: '', 
    component: MainComponent,
    children: [
      { 
        path: 'home', 
        loadChildren: () => import('./view/home/home.module').then(m => m.HomeModule) 
      }, 
      { 
        path: 'employee', 
        loadChildren: () => import('./view/employee/employee.module').then(m => m.EmployeeModule) 
      },
    ]
  },
  { 
    path: 'login', 
    loadChildren: () => import('./view/login/login.module').then(m => m.LoginModule) 
  },
  { 
    path: '**', 
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
