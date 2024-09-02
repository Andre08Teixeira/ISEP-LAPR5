import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { DeliveriesComponent } from './deliveries.component';

describe('DeliveriesComponent', () => {
  let component: DeliveriesComponent;
  let fixture: ComponentFixture<DeliveriesComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveriesComponent ],
      imports:[HttpClientTestingModule],
      providers:[DeliveriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
