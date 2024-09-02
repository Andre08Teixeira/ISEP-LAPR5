import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CourseCreateComponent } from './course-create.component';
import { CoursesComponent } from '../courses/courses.component';

describe('CourseCreateComponent', () => {
  let component: CourseCreateComponent;
  let fixture: ComponentFixture<CourseCreateComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCreateComponent ],
      imports:[HttpClientTestingModule],
      providers:[CoursesComponent,CourseCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
