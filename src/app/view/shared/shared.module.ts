import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';

import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    DialogModule
  ],
  exports: [
    LoadingComponent
  ]
})
export class SharedModule { }
