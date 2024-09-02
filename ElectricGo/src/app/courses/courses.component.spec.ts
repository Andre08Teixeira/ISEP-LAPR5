import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesComponent ],
      imports:[HttpClientTestingModule],
      providers:[CoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
