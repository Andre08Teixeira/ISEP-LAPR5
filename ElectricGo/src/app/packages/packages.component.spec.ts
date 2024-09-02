import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { PackagesComponent } from './packages.component';

describe('PackagesComponent', () => {
  let component: PackagesComponent;
  let fixture: ComponentFixture<PackagesComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagesComponent ],
      imports:[HttpClientTestingModule],
      providers:[PackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
