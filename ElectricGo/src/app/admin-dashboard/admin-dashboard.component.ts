import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent{

  constructor(private location: Location){}


  goBack(): void {
    this.location.back();
  }

}
