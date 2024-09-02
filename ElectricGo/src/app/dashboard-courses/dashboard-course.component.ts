import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-course',
  templateUrl: './dashboard-course.component.html',
  styleUrls: ['./dashboard-course.component.css']
})
export class DashboardCourseComponent {
  constructor(private location:Location){}
  goBack(): void {
    this.location.back();
  }
}
