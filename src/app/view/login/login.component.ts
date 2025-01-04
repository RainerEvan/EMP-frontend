import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AppConstants } from 'src/app/AppConstants';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading:boolean = false;
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.generateSigninForm();
  }

  generateSigninForm(){
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
  }

  login() {
    if(this.loginForm.valid){
      const formData = this.loginForm.value;
      this.isLoading = true;

      this.authService.login(formData).subscribe({
        next:(data:any) => {
          if(data.message == AppConstants.SUCCESS_MSG){
            this.isLoading = false;
            sessionStorage.setItem('userDetail', JSON.stringify(data.output));
            this.router.navigateByUrl('/home');
          } else {
            this.isLoading = false;
            this.confirmationService.confirm({
              header: 'FAILED',
              message: data.output.message,
              rejectVisible: false,
              icon: 'pi pi-check-circle',
              accept: () => {
              }
            });
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          console.log(error);
          this.loginForm.reset();
          this.confirmationService.confirm({
            header: 'ERROR',
            message: error.message,
            rejectVisible: false,
            icon: 'pi pi-check-circle',
            accept: () => {
            }
          });
        },
        complete(){
          this.isLoading = false;
        }
      });
    }
  }
}
