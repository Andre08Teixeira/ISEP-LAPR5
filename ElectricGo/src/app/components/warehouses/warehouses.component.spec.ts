import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { WarehousesComponent } from './warehouses.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('WarehousesComponent', () => {
  let component: WarehousesComponent;
  let fixture: ComponentFixture<WarehousesComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehousesComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[WarehousesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
