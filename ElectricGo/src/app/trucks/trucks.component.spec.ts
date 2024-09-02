import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TrucksComponent } from './trucks.component';

describe('TrucksComponent', () => {
  let component: TrucksComponent;
  let fixture: ComponentFixture<TrucksComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrucksComponent ],imports:[HttpClientTestingModule]
      ,providers:[TrucksComponent]

    })
    .compileComponents();

    fixture = TestBed.createComponent(TrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});