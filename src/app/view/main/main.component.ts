import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showSidebar: boolean = false;
  menus: any = [];

  constructor() {
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
  }

  toggleSidebar(){
    this.showSidebar = !this.showSidebar;
  }

}
