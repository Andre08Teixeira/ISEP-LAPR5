import { HttpClient} from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PackageDetailComponent } from './package-details2.component';

describe('PackageDetailComponent', () => {
  let component: PackageDetailComponent;
  let fixture: ComponentFixture<PackageDetailComponent>;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageDetailComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[PackageDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
