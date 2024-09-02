import { Component,OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { CoursesComponent } from '../courses/courses.component';
import { Location } from '@angular/common';



@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {


  constructor(private courseService: CourseService,private component:CoursesComponent,private location: Location){}


  add(warehouseID12:string,warehouseID22:string,distance2:string,duration2:string, energyNeeded2:string): void {

    var warehouseID1 = warehouseID12;
    var warehouseID2 = warehouseID22;
    var distance= Number(distance2);
    var duration = Number(duration2);
    var energyNeeded = Number(energyNeeded2);
    this.courseService.addCourse({warehouseID1, warehouseID2, distance, duration, energyNeeded} as Course)
      .subscribe(course => {
        this.component.courses.push(course);
      });

  }
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {

  }


}
