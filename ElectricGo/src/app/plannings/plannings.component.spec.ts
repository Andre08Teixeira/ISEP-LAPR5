import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { PlanningsComponent } from './plannings.component';

describe('PlanningsComponent', () => {
  let component: PlanningsComponent;
  let fixture: ComponentFixture<PlanningsComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningsComponent ],
      imports:[HttpClientTestingModule],
      providers:[PlanningsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
