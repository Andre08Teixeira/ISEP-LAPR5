import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTruckComponent } from './dashboard-truck.component';

describe('DashboardTruckComponent', () => {
  let component: DashboardTruckComponent;
  let fixture: ComponentFixture<DashboardTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTruckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
