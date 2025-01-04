import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  username: string = '';
  showSidebar: boolean = false;
  menus: any = [];

  constructor(private authService: AuthService, private confirmationService: ConfirmationService) {
    this.menus = [
      {
        label: 'Home',
        link: './home',
        icon: 'pi-home'
      },
      {
        label: 'Employee',
        link: './employee',
        icon: 'pi-users'
      },
      {
        label: 'Maintenance',
        link: './maintenance',
        icon: 'pi-wrench'
      }
    ]
   }

  ngOnInit(): void {
    this.username = this.authService.accountValue.username.toUpperCase();
  }

  toggleSidebar(){
    this.showSidebar = !this.showSidebar;
  }

  confirmLogout() {
    this.confirmationService.confirm({
        header: 'LOGOUT',
        message: 'Are you sure you want to logout?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.authService.logout();
        }
    });
  }

}
