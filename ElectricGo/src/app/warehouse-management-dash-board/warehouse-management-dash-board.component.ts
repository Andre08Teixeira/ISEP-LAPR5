import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-warehouse-management-dash-board',
  templateUrl: './warehouse-management-dash-board.component.html',
  styleUrls: ['./warehouse-management-dash-board.component.css']
})
export class WarehouseManagementDashBoardComponent {
  constructor(private location:Location){}
  goBack(): void {
    this.location.back();
  }
}
