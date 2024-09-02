import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TruckDetailComponent } from './truck-details.component';

describe('TruckDetailComponent', () => {
  let component: TruckDetailComponent;
  let fixture: ComponentFixture<TruckDetailComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckDetailComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[TruckDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});