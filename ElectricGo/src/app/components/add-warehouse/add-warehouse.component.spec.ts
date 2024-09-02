import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AddWarehouseComponent } from './add-warehouse.component';

describe('AddWarehouseComponent', () => {
  let component: AddWarehouseComponent;
  let fixture: ComponentFixture<AddWarehouseComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWarehouseComponent ],
      imports:[HttpClientTestingModule],
      providers:[AddWarehouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
