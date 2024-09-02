import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { DeliveryCreateComponent } from './delivery-create.component';
import { DeliveriesComponent } from '../deliveries/deliveries.component';

describe('DeliveryCreateComponent', () => {
  let component: DeliveryCreateComponent;
  let fixture: ComponentFixture<DeliveryCreateComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCreateComponent ],
      imports:[HttpClientTestingModule],
      providers:[DeliveriesComponent,DeliveryCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
