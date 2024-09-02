import { Component,OnInit,Input } from '@angular/core';
import { Course } from '../course';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CourseService } from '../course.service';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-course-details1',
  templateUrl: './course-details1.component.html',
  styleUrls: ['./course-details1.component.css']
})
export class CourseDetailComponent implements OnInit{
  @Input() course?: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private location: Location
  ) {}

getCourse():void{

  const id = String(this.route.snapshot.paramMap.get('id')!);
  this.courseService.getCourse(id)
    .subscribe((course) => this.course = course);

}

ngOnInit(): void {
  this.getCourse();
}

/*
delete(id: string): void {
  this.courseService.deleteCourse(id);
  this.location.back();
}
*/

goBack(): void {
  this.location.back();
}

}
