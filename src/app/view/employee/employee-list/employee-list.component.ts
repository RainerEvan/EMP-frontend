import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from 'src/app/AppConstants';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { MaintenanceService } from 'src/app/service/maintenance.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  isLoading: boolean = false;

  employees: Employee[];
  departments: any[];
  positions: any[];
  isLoadingTableEmployee: boolean = false;

  addEmployeeDialog: boolean = false;
  addEmployeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private employeeService: EmployeeService, private maintenanceService: MaintenanceService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    Promise.all([
      this.getListDeparment(),
      this.getListPosition()
    ]).then(() => {
      this.getListEmployees();
    })
    this.generateAddEmployeeForm();
    localStorage.clear();
  }

  getListEmployees(){
    this.isLoadingTableEmployee = true;
    this.employeeService.getListEmployee().subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.employees = [...data.output];

          this.employees = this.employees.map((employee: any) => {
            const department = this.departments.find((dept: any) => dept.name === employee.department);
            if (department) {
              employee.departmentDesc = department.description;
            }
            const position = this.positions.find((post: any) => post.name === employee.position);
            if (position) {
              employee.positionDesc = position.description;
            }
            return employee;
          });
        }
      },
      error:(error:any) => {
        this.isLoadingTableEmployee = false;
        console.log(error);
      },
      complete:() =>{
        this.isLoadingTableEmployee = false;
      }
    });
  }

  addEmployee(employee:any){
    this.isLoading = true;
    this.employeeService.addEmployee(employee).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.confirmationService.confirm({
            header: 'Success',
            message: 'Employee added successfully!',
            rejectVisible: false,
            icon: 'pi pi-check-circle',
            accept: () => {
              this.getListEmployees();
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

  deleteEmployee(employeeId: string){
    this.isLoading = true;
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.getListEmployees();
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

  getListDeparment(){
    const maintenanceGroupId = AppConstants.GROUP_CD_DEPARTMENT;

    this.maintenanceService.getListMaintenanceParam(maintenanceGroupId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.departments = [...data.output];
        }
      },
      error:(error:any) => {
        console.log(error);
      },
      complete:() =>{
      }
    });
  }

  getListPosition(){
    const maintenanceGroupId = AppConstants.GROUP_CD_POSITION;

    this.maintenanceService.getListMaintenanceParam(maintenanceGroupId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.positions = [...data.output];
        }
      },
      error:(error:any) => {
        console.log(error);
      },
      complete:() =>{
      }
    });
  }

  openEmployeeDetail(employee: Employee) {
    this.router.navigate(['/employee', employee.employeeId]);
  }

  openAddEmployeeDialog() {
    this.addEmployeeDialog = true;
    this.generateAddEmployeeForm();
  }

  closeAddEmployeeDialog(){
    this.addEmployeeDialog = false;
  }

  openDeleteEmployeeDialog(employee: Employee) {
    this.confirmationService.confirm({
        header: 'Delete Employee',
        message: 'Are you sure you want to delete ' + employee.employeeId + ' - ' + employee.fullName + '?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteEmployee(employee.id);
        }
    });
  }

  generateAddEmployeeForm(){
    this.addEmployeeForm = this.formBuilder.group({
      nik: ['', Validators.required],
      fullName: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      birthPlace: [''],
      birthDate: [''],
      phoneNumber: [''],
      email: [''],
      dateStart: ['', Validators.required],
      dateEnd: [''],
      isActive: [true, Validators.required],
    });
  }

  onSubmitAddEmployeeForm(){
    if(this.addEmployeeForm.valid){
      this.addEmployeeDialog = false;
      this.addEmployee(this.addEmployeeForm.value);
    }
  }
}
