import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPackageComponent } from './dashboard-package.component';

describe('DashboardPackageComponent', () => {
  let component: DashboardPackageComponent;
  let fixture: ComponentFixture<DashboardPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
