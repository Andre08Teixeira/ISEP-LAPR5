import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  pageSlice: any;



  constructor(private courseService: CourseService, private messageService: MessageService, private location: Location) {
    this.courseService.getCourses();
   }


  OnPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.courses.length) {
      endIndex = this.courses.length;
    }
    this.pageSlice = this.courses.slice(startIndex, endIndex);
  }


  ngOnInit(): void {
    this.getCourses();
    this.pageSlice=this.courses.slice(0,2);
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe((courses) => this.courses = courses);


  }
  goBack(): void {
    this.location.back();
  }

}
