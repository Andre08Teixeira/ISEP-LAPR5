import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-delivery',
  templateUrl: './dashboard-delivery.component.html',
  styleUrls: ['./dashboard-delivery.component.css']
})
export class DashboardDeliveryComponent {
  constructor(private location:Location){}
  goBack(): void {
    this.location.back();
  }
}
