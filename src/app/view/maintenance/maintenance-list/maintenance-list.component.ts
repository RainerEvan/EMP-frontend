import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MaintenanceGroup } from 'src/app/model/maintenance-group';
import { MaintenanceService } from 'src/app/service/maintenance.service';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {

  maintenanceDialog: boolean;
  maintenanceGroups: MaintenanceGroup[];
  submitted: boolean;
  statuses: any[];

  constructor(private router: Router, private maintenanceService: MaintenanceService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.maintenanceService.getEmployees().subscribe({
      next:(data:any) => {
          this.maintenanceGroups = data;
      },
      error:(error:any) => {
          console.log(error);
      }
    });

    this.maintenanceGroups = [
      {
        id: '1',
        groupId: '0001',
        name: 'Employee Tax',
        description: 'Tax for employee salary',
        createdAt: '27-10-204',
        createdBy: 'admin',
        updatedAt: '-',
        updatedBy: '-',
        isActive: true
      },
      {
        id: '2',
        groupId: '0002',
        name: 'Other Tax',
        description: 'Other Tax',
        createdAt: '27-10-204',
        createdBy: 'admin',
        updatedAt: '-',
        updatedBy: '-',
        isActive: true
      }
    ];
  }

  openAddMaintenanceGroup() {
    this.submitted = false;
    this.maintenanceDialog = true;
  }

  openMaintenanceGroupDetail(maintenanceGroup: MaintenanceGroup) {
    this.router.navigate(['/maintenance', maintenanceGroup.id]);
  }

  deletemaintenance(maintenanceGroup: MaintenanceGroup) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + maintenanceGroup.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.maintenanceGroups = this.maintenanceGroups.filter(val => val.id !== maintenanceGroup.id);
        }
    });
  }

  hideDialog() {
    this.maintenanceDialog = false;
    this.submitted = false;
  }

  savemaintenance() {
    this.submitted = true;
  }

}
