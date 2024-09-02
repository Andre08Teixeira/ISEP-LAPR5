import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarethreedComponent } from './warethreed.component';

describe('WarethreedComponent', () => {
  let component: WarethreedComponent;
  let fixture: ComponentFixture<WarethreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarethreedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarethreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
