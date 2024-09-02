import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-logistics-dashboard',
  templateUrl: './logistics-dashboard.component.html',
  styleUrls: ['./logistics-dashboard.component.css']
})
export class LogisticsDashboardComponent {
  constructor(private location:Location){}
  goBack(): void {
    this.location.back();
  }
}
