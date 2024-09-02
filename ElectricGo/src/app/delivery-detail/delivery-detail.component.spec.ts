import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { DeliveryDetailComponent } from './delivery-detail.component';

describe('DeliveryDetailComponent', () => {
  let component: DeliveryDetailComponent;
  let fixture: ComponentFixture<DeliveryDetailComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryDetailComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[DeliveryDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
