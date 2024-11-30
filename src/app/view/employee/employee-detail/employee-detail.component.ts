import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from 'src/app/AppConstants';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  isLoading:boolean = false;
  employeeId: string;
  employee: Employee;
  tabs: any[] = [];
  selectedTabs: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService) { 
    this.tabs = [
      {
        header: 'Profile',
        icon: 'pi pi-id-card',
        type: 'profile'
      },
      {
        header: 'Work',
        icon: 'pi pi-briefcase',
        type: 'work'
      },
      {
        header: 'Paycheck',
        icon: 'pi pi-money-bill',
        type: 'paycheck'
      }
    ];
  }

  ngOnInit(): void {
    this.getEmployeeDetail();
    this.initiateTab();
  }

  initiateTab(){
    let tab = localStorage.getItem('selectedTabs');

    if(tab){
      this.selectedTabs = +tab;
    }
  }

  selectTab(event:any){
    this.selectedTabs = event.index;
    localStorage.setItem('selectedTabs', this.selectedTabs.toString());
  }

  back(){
    this.router.navigate(['./employee']);
  }

  getEmployeeDetail(){
    const employeeId = this.route.snapshot.paramMap.get('id');

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
        this.isLoading = false;
      }
    });
  }
}
