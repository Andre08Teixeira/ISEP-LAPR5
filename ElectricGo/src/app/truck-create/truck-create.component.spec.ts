import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TruckCreateComponent } from './truck-create.component';
import { TrucksComponent } from '../trucks/trucks.component';

describe('TruckCreateComponent', () => {
  let component: TruckCreateComponent;
  let fixture: ComponentFixture<TruckCreateComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckCreateComponent ],
      imports:[HttpClientTestingModule], 
      providers:[TrucksComponent,TruckCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});