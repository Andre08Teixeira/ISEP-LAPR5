import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { WarehouseItemComponent } from './warehouse-item.component';

describe('WarehouseItemComponent', () => {
  let component: WarehouseItemComponent;
  let fixture: ComponentFixture<WarehouseItemComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseItemComponent ],
      imports:[HttpClientTestingModule],
      providers:[WarehouseItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
