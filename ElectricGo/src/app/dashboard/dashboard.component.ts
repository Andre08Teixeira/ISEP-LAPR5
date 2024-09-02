import { Component,OnInit } from '@angular/core';
import { Delivery } from '../delivery';
import { Course } from '../course';
import { DeliveryService } from '../delivery.service';
import { TruckService } from '../truck.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

deliveries: Delivery[]= [];

constructor(){}



  ngOnInit(): void {
    
  }

}


