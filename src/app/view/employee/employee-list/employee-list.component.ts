import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeDialog: boolean;
  employees: Employee[];
  submitted: boolean;
  statuses: any[];

  constructor(private router: Router, private employeeService: EmployeeService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe({
      next:(data:any) => {
          this.employees = data;
      },
      error:(error:any) => {
          console.log(error);
      }
    });

    this.employees = [
      {
          id: '1',
          employeeId: 'U0001',
          fullName: 'Abraham',
          department: 'Storage',
          position: 'Head Manager',
          birthPlace: '',
          birthDate: '',
          phoneNumber: '',
          email: '',
          dateStart: '20-10-2024',
          dateEnd: '',
          baseSalary: '',
          isActive: true
      },
      {
          id: '2',
          employeeId: 'U0002',
          fullName: 'Budi',
          department: 'Logistic',
          position: 'Manager',
          birthPlace: '',
          birthDate: '',
          phoneNumber: '',
          email: '',
          dateStart: '12-09-2024',
          dateEnd: '',
          baseSalary: '',
          isActive: true
      },
      {
          id: '3',
          employeeId: 'U0003',
          fullName: 'Cecep',
          department: 'Marketing',
          position: 'Staff',
          birthPlace: '',
          birthDate: '',
          phoneNumber: '',
          email: '',
          dateStart: '02-01-2024',
          dateEnd: '',
          baseSalary: '',
          isActive: true
      },
    ];
  }

  openAddEmployee() {
    this.submitted = false;
    this.employeeDialog = true;
  }

  openEmployeeDetail(employee: Employee) {
    this.router.navigate(['/employee', employee.employeeId]);
  }

  deleteEmployee(employee: Employee) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + employee.fullName + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.employees = this.employees.filter(val => val.id !== employee.id);
        }
    });
  }

  hideDialog() {
    this.employeeDialog = false;
    this.submitted = false;
  }

  saveEmployee() {
    this.submitted = true;
  }

}
