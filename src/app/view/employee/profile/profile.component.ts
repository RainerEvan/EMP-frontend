import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  employeeImageUrl:any;

  isLoading: boolean = false;
  isEditable: boolean = false;
  uploadImageDialog: boolean = false;
  profileImg:any;
  imageUrl:any;
  uploadFileErrorMessage: string = '';

  constructor(private employeeService: EmployeeService, private confirmationService: ConfirmationService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    if(this.employee){
      this.loadProfileImage();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee'] && changes['employee'].currentValue) {
      this.loadProfileImage();
    }
  }

  loadProfileImage(){
    if(this.employee.profileImage){
      this.employeeImageUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+ this.employee.profileImage);
    }
  }

  onSelectFile(event:any){
    const maxSize = 5 * 1024 * 1024;

    if(event.target.files.length > 0){
      this.profileImg = event.target.files[0];

      if(this.profileImg.size > maxSize){
        this.uploadFileErrorMessage = 'Max file size is 5MB';
        this.profileImg = null;
      } else{
        this.uploadFileErrorMessage = '';
        this.previewImage(this.profileImg);
      }
    }
  }

  previewImage(image:any){
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }

  openUploadImageDialog(){
    this.uploadFileErrorMessage = '';
    this.profileImg = null;
    this.imageUrl = null;
    this.uploadImageDialog = true;
  }

  closeUploadImageDialog(){
    this.uploadFileErrorMessage = '';
    this.profileImg = null;
    this.imageUrl = null;
    this.uploadImageDialog = false;
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

  updateEmployeeProfileImage(employee:any, profileImage:any){
    this.isLoading = true;
    const formData = new FormData();
    formData.append('image', profileImage);
    this.employeeService.updateEmployeeProfileImage(employee.employeeId, formData).subscribe({
      next:(data:any) => {
        if(data.message == AppConstants.SUCCESS_MSG){
          this.isLoading = false;
          this.closeUploadImageDialog();
          this.confirmationService.confirm({
            header: 'Success',
            message: 'Employee profile image updated successfully!',
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

  onSubmitUpdateEmployeeProfileForm(){
    this.updateEmployeeProfile(this.employee);
  }

  onSubmitUpdateProfileImage(){
    this.updateEmployeeProfileImage(this.employee, this.profileImg);
  }
}
