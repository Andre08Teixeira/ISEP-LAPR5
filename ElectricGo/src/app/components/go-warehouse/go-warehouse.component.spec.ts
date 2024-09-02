import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoWarehouseComponent } from './go-warehouse.component';

describe('GoWarehouseComponent', () => {
  let component: GoWarehouseComponent;
  let fixture: ComponentFixture<GoWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
