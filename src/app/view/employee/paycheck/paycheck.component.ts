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

  constructor(private router: Router, private paycheckService: PaycheckService, private confirmationService: ConfirmationService) { }

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

  generatePaycheckReport(paycheckId: string) {
    this.isLoading = true;
    this.paycheckService.getPaycheckReport(paycheckId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.viewPdf(data.output);
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

  sendPaycheckEmail(paycheckId: string) {
    this.isLoading = true;
    this.paycheckService.sendPaycheckEmail(paycheckId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.confirmationService.confirm({
            header: 'Success',
            message: 'Paycheck email sent successfully!',
            rejectVisible: false,
            icon: 'pi pi-check-circle',
            accept: () => {
              this.getListPaychecks();
            }
          });
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

  openGenerateReportDialog(paycheck: Paycheck){
    this.confirmationService.confirm({
      header: 'View PDF',
      message: 'Do you want to view in PDF?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.generatePaycheckReport(paycheck.id);
      }
    });
  }

  openSendEmailDialog(paycheck: Paycheck){
    this.confirmationService.confirm({
      header: 'View PDF',
      message: 'Do you want to send paycheck email?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sendPaycheckEmail(paycheck.id);
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

  viewPdf(base64: string): void {
    const binaryString = window.atob(base64);
    
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const blob = new Blob([bytes.buffer], { type: 'application/pdf' });
    
    const blobUrl = URL.createObjectURL(blob);
    
    window.open(blobUrl, '_blank');
  }
}
