import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CreateTripComponent } from './create-trip.component';
import { PlanningsComponent } from '../plannings/plannings.component';

describe('CreateTripComponent', () => {
  let component: CreateTripComponent;
  let fixture: ComponentFixture<CreateTripComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTripComponent ],
      imports:[HttpClientTestingModule], 
      providers:[PlanningsComponent,CreateTripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
