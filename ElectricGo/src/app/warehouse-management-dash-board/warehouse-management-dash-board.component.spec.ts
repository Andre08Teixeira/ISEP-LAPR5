import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseManagementDashBoardComponent } from './warehouse-management-dash-board.component';

describe('WarehouseManagementDashBoardComponent', () => {
  let component: WarehouseManagementDashBoardComponent;
  let fixture: ComponentFixture<WarehouseManagementDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseManagementDashBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseManagementDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
