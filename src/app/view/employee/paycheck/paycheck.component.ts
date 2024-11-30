import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from 'src/app/AppConstants';
import { Employee } from 'src/app/model/employee';
import { Paycheck } from 'src/app/model/paycheck';
import { PaycheckService } from 'src/app/service/paycheck.service';

@Component({
  selector: 'app-paycheck',
  templateUrl: './paycheck.component.html',
  styleUrls: ['./paycheck.component.css']
})
export class PaycheckComponent implements OnInit {

  @Input() employee: Employee;

  isLoading: boolean = false;
  isLoadingTablePaycheck: boolean = false;

  paycheckDialog: boolean;
  paychecks: Paycheck[];
  submitted: boolean;
  statuses: any[];

  constructor(private sanitizer: DomSanitizer, private router: Router, private paycheckService: PaycheckService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    if(this.employee){
      this.getListPaychecks();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee'] && changes['employee'].currentValue) {
      this.getListPaychecks();
    }
  }

  getListPaychecks(){
    const employeeId = this.employee.employeeId;
    this.isLoadingTablePaycheck = true;
    this.paycheckService.getListPaycheck(employeeId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.paychecks = [...data.output];
        }
      },
      error:(error:any) => {
        this.isLoadingTablePaycheck = false;
        console.log(error);
      },
      complete:() =>{
        this.isLoadingTablePaycheck = false;
      }
    });
  }

  generatePaycheck() {
    const employeeId = this.employee.employeeId;

    this.router.navigate([`employee/${employeeId}/paycheck/0`]);
  }

  openPaycheckDetail(paycheck: Paycheck) {
    const employeeId = this.employee.employeeId;

    this.router.navigate([`employee/${employeeId}/paycheck/${paycheck.id}`]);
  }

  openPaycheckFile(paycheck: Paycheck) {
    const pdfUrl = '../assets/sample.pdf';
    window.open(pdfUrl as string, '_blank');
  }

  sendPaycheckEmail(paycheck: Paycheck) {
  }

  deletePaycheck(paycheckId: string){
    this.isLoading = true;
    this.paycheckService.deletePaycheck(paycheckId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.getListPaychecks();
        }
      },
      error:(error:any) => {
        this.isLoading = false;
        console.log(error);
      },
      complete:() =>{
        this.isLoading = false;
      }
    });
  }

  openDeletePaycheckDialog(paycheck: Paycheck) {
    this.confirmationService.confirm({
        header: 'Delete Paycheck',
        message: 'Are you sure you want to delete ' + paycheck.fileName + '?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deletePaycheck(paycheck.id);
        }
    });
  }
}
