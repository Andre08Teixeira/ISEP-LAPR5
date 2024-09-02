import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-truck',
  templateUrl: './dashboard-truck.component.html',
  styleUrls: ['./dashboard-truck.component.css']
})
export class DashboardTruckComponent {
  constructor(private location:Location){}
  goBack(): void {
    this.location.back();
  }
}