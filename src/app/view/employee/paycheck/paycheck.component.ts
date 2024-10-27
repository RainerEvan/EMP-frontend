import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Paycheck } from 'src/app/model/paycheck';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-paycheck',
  templateUrl: './paycheck.component.html',
  styleUrls: ['./paycheck.component.css']
})
export class PaycheckComponent implements OnInit {

  paycheckDialog: boolean;
  paychecks: Paycheck[];
  submitted: boolean;
  statuses: any[];

  constructor(private router: Router, private employeeService: EmployeeService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    // this.paycheckService.getpaychecks().subscribe({
    //   next:(data:any) => {
    //       this.paychecks = data;
    //   },
    //   error:(error:any) => {
    //       console.log(error);
    //   }
    // });

    this.paychecks = [
        {
          id: '1',
          employeeId: 'U0001',
          fileName: 'PR/09092024/0001_U0001',
          fileBase64: '',
          dateLastSent: '10-09-2024',
          countSent: '1',
          createdAt: '09-09-2024',
          createdBy: 'admin'
        },
        {
          id: '1',
          employeeId: 'U0002',
          fileName: 'PR/09092024/0002_U0002',
          fileBase64: '',
          dateLastSent: '-',
          countSent: '0',
          createdAt: '09-09-2024',
          createdBy: 'admin'
        },
        {
          id: '1',
          employeeId: 'U0001',
          fileName: 'PR/20032024/0001_U0001',
          fileBase64: '',
          dateLastSent: '10-09-2024',
          countSent: '1',
          createdAt: '20-03-2024',
          createdBy: 'admin'
        }
    ];
  }

  openAddpaycheck() {
    this.submitted = false;
    this.paycheckDialog = true;
  }

  openpaycheckDetail(paycheck: Paycheck) {
  }

  deletepaycheck(paycheck: Paycheck) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + paycheck.fileName + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.paychecks = this.paychecks.filter(val => val.id !== paycheck.id);
        }
    });
  }

  hideDialog() {
    this.paycheckDialog = false;
    this.submitted = false;
  }

  savepaycheck() {
    this.submitted = true;
  }
}
