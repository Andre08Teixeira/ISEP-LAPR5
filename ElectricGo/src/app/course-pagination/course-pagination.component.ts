import { Component, OnInit, ViewChild } from '@angular/core';
import {MaterialModule} from '../material-module';
import { Location } from '@angular/common';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { CoursesComponent } from '../courses/courses.component';


@Component({
    selector: 'app-course-pagination',
    templateUrl: './course-pagination.component.html',
    styleUrls: ['./course-pagination.component.css']
})

export class CoursePaginationComponent implements OnInit {
    courses: Course[] = [];
    displayedColumns: string[] = ['id', 'warehouseID1', 'warehouseID2','action'];
    dataSource :any;

    @ViewChild(MatPaginator) paginator !:MatPaginator;
    @ViewChild(MatSort) sort !:MatPaginator;

    constructor(private courseService: CourseService,private component:CoursesComponent,private location: Location){}

    async getCourses(){
        this.courses = await this.courseService.getCourses().toPromise();
    }

    async ngOnInit(){
        await this.getCourses();
        this.dataSource = new MatTableDataSource<Course>(this.courses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    goBack(): void {
        this.location.back();
        }

    Filterchange(event:Event){
        const filter=(event.target as HTMLInputElement).value;
        this.dataSource.filter = filter;
    }


}
