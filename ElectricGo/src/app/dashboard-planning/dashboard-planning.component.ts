import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-planning',
  templateUrl: './dashboard-planning.component.html',
  styleUrls: ['./dashboard-planning.component.css']
})
export class DashboardPlanningComponent {
  constructor(private location:Location){}
  goBack(): void {
    this.location.back();
  }
}
