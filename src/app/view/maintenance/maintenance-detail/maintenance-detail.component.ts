import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Maintenance } from 'src/app/model/maintenance';
import { MaintenanceGroup } from 'src/app/model/maintenance-group';
import { MaintenanceService } from 'src/app/service/maintenance.service';

@Component({
  selector: 'app-maintenance-detail',
  templateUrl: './maintenance-detail.component.html',
  styleUrls: ['./maintenance-detail.component.css']
})
export class MaintenanceDetailComponent implements OnInit {

  isEditable: boolean = false;

  maintenanceDialog: boolean;
  maintenanceGroup: MaintenanceGroup;
  maintenances: Maintenance[];
  submitted: boolean;
  statuses: any[];

  constructor(private router: Router, private maintenanceService: MaintenanceService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    // this.maintenanceService.getmaintenances().subscribe({
    //   next:(data:any) => {
    //       this.maintenances = data;
    //   },
    //   error:(error:any) => {
    //       console.log(error);
    //   }
    // });

    this.maintenanceGroup =  {
      id: '1',
      groupId: '0001',
      name: 'Employee Tax',
      description: 'Tax for employee salary',
      createdAt: '27-10-204',
      createdBy: 'admin',
      updatedAt: '-',
      updatedBy: '-',
      isActive: true
    }

    this.maintenances = [
      {
        id: '1',
        groupId: '0001',
        priority: '1',
        name: 'Employee Tax',
        description: 'Tax for employee salary',
        extraCd1: '13000',
        extraCd2: '-',
        extraCd3: '-',
        createdAt: '27-10-204',
        createdBy: 'admin',
        updatedAt: '-',
        updatedBy: '-',
        isActive: true
      },
      {
        id: '2',
        groupId: '0002',
        priority: '2', 
        name: 'Other Tax',
        description: 'Other Tax',
        extraCd1: '13000',
        extraCd2: '-',
        extraCd3: '-',
        createdAt: '27-10-204',
        createdBy: 'admin',
        updatedAt: '-',
        updatedBy: '-',
        isActive: true
      }
    ];
  }

  back(){
    this.router.navigate(['./maintenance']);
  }

  openAddMaintenance() {
    this.submitted = false;
    this.maintenanceDialog = true;
  }

  openMaintenanceDetail(maintenance: Maintenance) {
  }

  deleteMaintenance(maintenance: Maintenance) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + maintenance.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.maintenances = this.maintenances.filter(val => val.id !== maintenance.id);
        }
    });
  }

  hideDialog() {
    this.maintenanceDialog = false;
    this.submitted = false;
  }

  saveMaintenance() {
    this.submitted = true;
  }

}
