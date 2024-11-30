import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from 'src/app/AppConstants';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() employee: Employee;
  @Output() refreshEmployee: EventEmitter<string> = new EventEmitter();

  isLoading: boolean = false;
  isEditable: boolean = false;

  constructor(private employeeService: EmployeeService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  toggleEditable(){
    this.isEditable = !this.isEditable;
  }

  updateEmployeeProfile(employee:any){
    this.isLoading = true;
    this.employeeService.updateEmployee(employee.employeeId, employee).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.confirmationService.confirm({
            header: 'Success',
            message: 'Employee profile updated successfully!',
            rejectVisible: false,
            icon: 'pi pi-check-circle',
            accept: () => {
              this.refreshEmployee.emit();
              this.isEditable = false;
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

  onSubmitUpdateEmployeeProfileForm(){
    this.updateEmployeeProfile(this.employee);
  }
}
