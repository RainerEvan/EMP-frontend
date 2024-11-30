import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from 'src/app/AppConstants';
import { MaintenanceGroup } from 'src/app/model/maintenance-group';
import { MaintenanceService } from 'src/app/service/maintenance.service';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {

  isLoading: boolean = false;

  maintenanceGroups: MaintenanceGroup[];
  isLoadingTableMaintenanceGroup: boolean = false;

  addMaintenanceGroupDialog: boolean = false;
  addMaintenanceGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private maintenanceService: MaintenanceService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getListMaintenanceGroups();
    this.generateAddMaintenanceGroupForm();
  }

  getListMaintenanceGroups(){
    this.isLoadingTableMaintenanceGroup = true;
    this.maintenanceService.getListMaintenanceGroup().subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.maintenanceGroups = [...data.output];
        }
      },
      error:(error:any) => {
        this.isLoadingTableMaintenanceGroup = false;
        console.log(error);
      },
      complete:() =>{
        this.isLoadingTableMaintenanceGroup = false;
      }
    });
  }

  addMaintenanceGroup(maintenanceGroup:any){
    this.isLoading = true;
    this.maintenanceService.addMaintenanceGroup(maintenanceGroup).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.confirmationService.confirm({
            header: 'Success',
            message: 'Maintenance Group added successfully!',
            rejectVisible: false,
            icon: 'pi pi-check-circle',
            accept: () => {
              this.getListMaintenanceGroups();
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

  deleteMaintenanceGroup(maintenanceGroupId: string){
    this.isLoading = true;
    this.maintenanceService.deleteMaintenanceGroup(maintenanceGroupId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.getListMaintenanceGroups();
        }
      },
      error:(error:any) => {
        this.isLoading = false;
        console.log(error);
      }
    });
  }

  openMaintenanceGroupDetail(maintenanceGroup: MaintenanceGroup) {
    this.router.navigate(['/maintenance', maintenanceGroup.groupId]);
  }

  openAddMaintenanceGroupDialog() {
    this.addMaintenanceGroupDialog = true;
    this.generateAddMaintenanceGroupForm();
  }

  closeAddMaintenanceGroupDialog(){
    this.addMaintenanceGroupDialog = false;
  }

  openDeleteMaintenanceGroupDialog(maintenanceGroup: MaintenanceGroup) {
    this.confirmationService.confirm({
        header: 'Delete Maintenance Group',
        message: 'Are you sure you want to delete ' + maintenanceGroup.name + '?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteMaintenanceGroup(maintenanceGroup.groupId);
        }
    });
  }

  generateAddMaintenanceGroupForm(){
    this.addMaintenanceGroupForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      isActive: [true, Validators.required],
    });
  }

  onSubmitAddMaintenanceGroupForm(){
    if(this.addMaintenanceGroupForm.valid){
      this.addMaintenanceGroupDialog = false;
      this.addMaintenanceGroup(this.addMaintenanceGroupForm.value);
    }
  }
}
