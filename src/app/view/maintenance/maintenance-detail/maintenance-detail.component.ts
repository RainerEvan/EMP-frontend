import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from 'src/app/AppConstants';
import { Maintenance } from 'src/app/model/maintenance';
import { MaintenanceGroup } from 'src/app/model/maintenance-group';
import { MaintenanceService } from 'src/app/service/maintenance.service';

@Component({
  selector: 'app-maintenance-detail',
  templateUrl: './maintenance-detail.component.html',
  styleUrls: ['./maintenance-detail.component.css']
})
export class MaintenanceDetailComponent implements OnInit {

  isLoading: boolean = false;
  isEditable: boolean = false;

  maintenanceGroup: MaintenanceGroup;

  maintenanceParams: Maintenance[];
  isLoadingTableMaintenanceParam: boolean = false;
  isUpdateMaintenanceParam: boolean = false;

  addMaintenanceParamDialog: boolean = false;
  addMaintenanceParamForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private maintenanceService: MaintenanceService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getMaintenanceGroupDetail();
    this.getListMaintenanceParams();
    this.generateAddMaintenanceParamForm();
  }

  getMaintenanceGroupDetail(){
    const maintenanceGroupId = this.route.snapshot.paramMap.get('id');

    this.isLoading = true;
    this.maintenanceService.getMaintenanceGroupDetail(maintenanceGroupId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.maintenanceGroup = data.output;
        }
      },
      error:(error:any) => {
        this.isLoading = false;
        console.log(error);
      },
      complete:() =>{
        this.isLoading = false;      }
    });
  }

  updateMaintenanceGroup(maintenanceGroup:any){
    this.isLoading = true;
    this.maintenanceService.updateMaintenanceGroup(maintenanceGroup.maintenanceGroupId, maintenanceGroup).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.confirmationService.confirm({
            header: 'Success',
            message: 'Maintenance group updated successfully!',
            rejectVisible: false,
            icon: 'pi pi-check-circle',
            accept: () => {
              this.getMaintenanceGroupDetail();
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

  getListMaintenanceParams(){
    const maintenanceGroupId = this.route.snapshot.paramMap.get('id');

    this.isLoadingTableMaintenanceParam = true;
    this.maintenanceService.getListMaintenanceParam(maintenanceGroupId).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.maintenanceParams = [...data.output];
        }
      },
      error:(error:any) => {
        this.isLoadingTableMaintenanceParam = false;
        console.log(error);
      },
      complete:() =>{
        this.isLoadingTableMaintenanceParam = false;
      }
    });
  }

  
  addMaintenanceParam(maintenanceParam:any){
    this.isLoading = true;
    this.maintenanceService.addMaintenanceParam(maintenanceParam).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.confirmationService.confirm({
            header: 'Success',
            message: 'Maintenance Param added successfully!',
            rejectVisible: false,
            icon: 'pi pi-check-circle',
            accept: () => {
              this.getListMaintenanceParams();
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

  updateMaintenanceParam(maintenanceParam:any){
    this.isLoading = true;
    this.maintenanceService.updateMaintenanceParam(maintenanceParam).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.confirmationService.confirm({
            header: 'Success',
            message: 'Maintenance Param updated successfully!',
            rejectVisible: false,
            icon: 'pi pi-check-circle',
            accept: () => {
              this.getListMaintenanceParams();
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

  deleteMaintenanceParam(maintenanceParamCd: string){
    this.isLoading = true;
    this.maintenanceService.deleteMaintenanceParam(maintenanceParamCd).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.getListMaintenanceParams();
        }
      },
      error:(error:any) => {
        this.isLoading = false;
        console.log(error);
      }
    });
  }

  onSubmitUpdateMaintenanceGroupForm(){
    this.updateMaintenanceGroup(this.maintenanceGroup);
  }

  openAddMaintenanceParamDialog() {
    this.addMaintenanceParamDialog = true;
    this.isUpdateMaintenanceParam = false;
    this.generateAddMaintenanceParamForm();
  }

  openEditMaintenanceParamDialog(maintenanceParam: Maintenance) {
    this.addMaintenanceParamDialog = true;
    this.isUpdateMaintenanceParam = true;
    this.generateEditMaintenanceParamForm(maintenanceParam);
  }

  closeAddMaintenanceParamDialog(){
    this.addMaintenanceParamDialog = false;
  }

  openDeleteMaintenanceParamDialog(maintenanceParam: Maintenance) {
    this.confirmationService.confirm({
        header: 'Delete Maintenance Param',
        message: 'Are you sure you want to delete ' + maintenanceParam.name + '?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteMaintenanceParam(maintenanceParam.paramCd);
        }
    });
  }

  generateAddMaintenanceParamForm(){
    const maintenanceGroupId = this.route.snapshot.paramMap.get('id');

    this.addMaintenanceParamForm = this.formBuilder.group({
      groupId: [{value: maintenanceGroupId, disabled: true}, Validators.required],
      name: ['', Validators.required],
      description: [''],
      extraCd1: [''],
      extraCd2: [''],
      extraCd3: [''],
      isActive: [true, Validators.required],
    });
  }

  generateEditMaintenanceParamForm(maintenanceParam: Maintenance){
    this.addMaintenanceParamForm = this.formBuilder.group({
      id: [{value: maintenanceParam.id, disabled: true}, Validators.required],
      groupId: [{value: this.maintenanceGroup.groupId, disabled: true}, Validators.required],
      paramCd: [{value: maintenanceParam.paramCd, disabled: true}, Validators.required],
      name: [maintenanceParam.name, Validators.required],
      description: [maintenanceParam.description],
      extraCd1: [maintenanceParam.extraCd1],
      extraCd2: [maintenanceParam.extraCd2],
      extraCd3: [maintenanceParam.extraCd3],
      isActive: [maintenanceParam.isActive, Validators.required],
    });
  }

  onSubmitAddMaintenanceParamForm(){
    if(this.addMaintenanceParamForm.valid){
      this.addMaintenanceParamDialog = false;
      this.addMaintenanceParam(this.addMaintenanceParamForm.getRawValue());
    }
  }

  onSubmitEditMaintenanceParamForm(){
    if(this.addMaintenanceParamForm.valid){
      this.addMaintenanceParamDialog = false;
      this.updateMaintenanceParam(this.addMaintenanceParamForm.getRawValue());
    }
  }

  back(){
    this.router.navigate(['./maintenance']);
  }

  toggleEditable(){
    this.isEditable = !this.isEditable;
  }
}
