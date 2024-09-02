import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { PackageCreateComponent } from './package-create.component';
import { PackagesComponent } from '../packages/packages.component';

describe('PackageCreateComponent', () => {
  let component: PackageCreateComponent;
  let fixture: ComponentFixture<PackageCreateComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageCreateComponent ],
      imports:[HttpClientTestingModule],
      providers:[PackagesComponent,PackageCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});