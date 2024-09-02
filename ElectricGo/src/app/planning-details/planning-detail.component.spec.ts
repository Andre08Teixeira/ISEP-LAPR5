import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { PlanningDetailComponent } from './planning-detail.component';

describe('PlanningDetailComponent', () => {
  let component: PlanningDetailComponent;
  let fixture: ComponentFixture<PlanningDetailComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningDetailComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[PlanningDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
