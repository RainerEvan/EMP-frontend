import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from 'src/app/AppConstants';
import { Employee } from 'src/app/model/employee';
import { Paycheck } from 'src/app/model/paycheck';
import { EmployeeService } from 'src/app/service/employee.service';
import { MaintenanceService } from 'src/app/service/maintenance.service';
import { PaycheckService } from 'src/app/service/paycheck.service';

@Component({
  selector: 'app-paycheck-detail',
  templateUrl: './paycheck-detail.component.html',
  styleUrls: ['./paycheck-detail.component.css']
})
export class PaycheckDetailComponent implements OnInit {

  isLoading: boolean = false;

  employee: Employee;
  isAddPaycheck: boolean = false;
  paycheck: Paycheck;

  paycheckDialog: boolean;
  submitted: boolean;
  statuses: any[];
  pajak: any[];
  bpjs: any[];

  pajakPenghasilan: any;
  bpjsKesehatan: any;
  bpjsKetenagakerjaan: any;

  paycheckFileBase64: any;

  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService, private paycheckService: PaycheckService, private maintenanceService: MaintenanceService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    Promise.all([
      this.getListPajak(),
      this.getListBPJS()
    ]).then(() => {
      this.getEmployeeData();
    })
  }

  back(){
    this.router.navigate(['./employee/', this.employee.employeeId]);
  }

  getListPajak(){
    const maintenanceGroupId = AppConstants.GROUP_CD_PAJAK;

    this.maintenanceService.getListMaintenanceParam(maintenanceGroupId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.pajak = [...data.output];
        }
      },
      error:(error:any) => {
        console.log(error);
      },
      complete:() =>{
        this.pajakPenghasilan = this.pajak.find((pajak: any) => pajak.name === AppConstants.PARAM_NAME_PAJAK_PENGHASILAN);
      }
    });
  }

  getListBPJS(){
    const maintenanceGroupId = AppConstants.GROUP_CD_BPJS;

    this.maintenanceService.getListMaintenanceParam(maintenanceGroupId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.bpjs = [...data.output];
        }
      },
      error:(error:any) => {
        console.log(error);
      },
      complete:() =>{
        this.bpjsKesehatan = this.bpjs.find((pajak: any) => pajak.name === AppConstants.PARAM_NAME_BPJS_KESEHATAN);
        this.bpjsKetenagakerjaan = this.bpjs.find((pajak: any) => pajak.name === AppConstants.PARAM_NAME_BPJS_KETENAGAKERJAAN);
      }
    });
  }

  getEmployeeData(){
    const employeeId = this.route.snapshot.paramMap.get('employeeId');

    this.isLoading = true;
    this.employeeService.getEmployeeDetail(employeeId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.employee = data.output;
        }
      },
      error:(error:any) => {
        this.isLoading = false;
        console.log(error);
      },
      complete:() =>{
        this.checkPaycheckId();
        this.isLoading = false;
      }
    });
  }

  checkPaycheckId(){
    const paycheckId = this.route.snapshot.paramMap.get('paycheckId');
    this.isAddPaycheck = false;

    if(paycheckId == '0'){
      this.initiatePaycheck();
      this.isAddPaycheck = true;
    } else{
      this.getPaycheckDetail();
    }
  }

  initiatePaycheck(){
    this.paycheck = {
      id: '',
      employeeId: this.employee.employeeId,
      baseSalary: this.employee.baseSalary,
      countSent: 0,
      transportationAllowance: 0,
      foodAllowance: 0,
      overtime: 0,
      totalGrossIncome: 0,
      bpjsKesehatan: 0,
      bpjsKetenagakerjaan: 0,
      tax: 0,
      otherCut: 0,
      totalDeduction: 0,
      totalNetIncome: 0
    }
  }

  getPaycheckDetail(){
    const paycheckId = this.route.snapshot.paramMap.get('paycheckId');

    this.isLoading = true;
    this.paycheckService.getPaycheckDetail(paycheckId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.paycheck = data.output;
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

  addPaycheck(paycheck:any){
    this.isLoading = true;
    this.paycheckService.addPaycheck(paycheck).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.confirmationService.confirm({
            header: 'Success',
            message: 'Paycheck added successfully!',
            rejectVisible: false,
            icon: 'pi pi-check-circle',
            accept: () => {
              this.back();
            }
          });
        }
      },
      error:(error:any) => {
        this.isLoading = false;
        console.log(error);
      }
    });
  }

  generatePaycheckReport(){
    const paycheckId = this.route.snapshot.paramMap.get('paycheckId');

    this.isLoading = true;
    this.paycheckService.getPaycheckReport(paycheckId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.paycheckFileBase64 = data.output;
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

  openAddPaycheckDialog() {
    this.addPaycheck(this.paycheck);
  }

  onBlurPendapatan(){
    let gajiPokok = this.paycheck.baseSalary;
    let tunjanganTransport = this.paycheck.transportationAllowance;
    let tunjanganMakan = this.paycheck.foodAllowance;
    let lembur = this.paycheck.overtime;

    let totalGrossIncome = gajiPokok + tunjanganTransport + tunjanganMakan + lembur;

    let bpjsKesehatanParam = (+this.bpjsKesehatan.extraCd1)/100;
    let bpjsKetenagakerjaanParam = (+this.bpjsKetenagakerjaan.extraCd1)/100;
    let pajakPenghasilanParam = (+this.pajakPenghasilan.extraCd1)/100;

    let bpjsKesehatan = gajiPokok * bpjsKesehatanParam;
    let bpjsKetenagakerjaan = gajiPokok * bpjsKetenagakerjaanParam;
    let pajak = totalGrossIncome * pajakPenghasilanParam;
    let lainnya = this.paycheck.otherCut;

    let totalDeduction = bpjsKesehatan + bpjsKetenagakerjaan + pajak + lainnya;

    let gajiBersih = totalGrossIncome - totalDeduction;

    this.paycheck.bpjsKesehatan = bpjsKesehatan;
    this.paycheck.bpjsKetenagakerjaan = bpjsKetenagakerjaan;
    this.paycheck.tax = pajak;
    this.paycheck.totalGrossIncome = totalGrossIncome;
    this.paycheck.totalDeduction = totalDeduction;
    this.paycheck.totalNetIncome = gajiBersih;
  }

  openGenerateReportDialog(){
    this.confirmationService.confirm({
      header: 'View PDF',
      message: 'Do you want to view in PDF?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.generatePaycheckReport();
      }
    });
  }
}
