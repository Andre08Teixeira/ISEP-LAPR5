import { TestBed } from '@angular/core/testing';

import { LogisticsManagerService } from './logistics-manager.service';

describe('LogisticsManagerService', () => {
  let service: LogisticsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogisticsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
