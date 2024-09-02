import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-package',
  templateUrl: './dashboard-package.component.html',
  styleUrls: ['./dashboard-package.component.css']
})
export class DashboardPackageComponent {
  constructor(private location:Location){}
  goBack(): void {
    this.location.back();
  }
}