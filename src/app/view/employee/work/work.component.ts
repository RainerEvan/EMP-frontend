import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from 'src/app/AppConstants';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { MaintenanceService } from 'src/app/service/maintenance.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  @Input() employee: Employee;
  @Output() refreshEmployee: EventEmitter<string> = new EventEmitter();

  isLoading: boolean = false;
  isEditable: boolean = false;

  departments: any[];
  positions: any[];

  constructor(private employeeService: EmployeeService, private maintenanceService: MaintenanceService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getListDeparment();
    this.getListPosition();
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
        const department = this.departments.find((dept: any) => dept.name === this.employee.department);
        if (department) {
          this.employee.departmentDesc = department.description;
        }
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
        const position = this.positions.find((post: any) => post.name === this.employee.position);
        if (position) {
          this.employee.positionDesc = position.description;
        }
      }
    });
  }

  toggleEditable(){
    this.isEditable = !this.isEditable;
  }

  updateEmployeeWork(employee:any){
    this.isLoading = true;
    this.employeeService.updateEmployee(employee.employeeId, employee).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.confirmationService.confirm({
            header: 'Success',
            message: 'Employee work updated successfully!',
            rejectVisible: false,
            icon: 'pi pi-check-circle',
            accept: () => {
              this.refreshEmployee.emit();
              this.isEditable = false;
              window.location.reload();
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

  onSubmitUpdateEmployeeWorkForm(){
    this.updateEmployeeWork(this.employee);
  }
}
