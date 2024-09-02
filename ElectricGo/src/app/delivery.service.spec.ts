import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { DeliveryService } from './delivery.service';

describe('DeliveryService', () => {
  let service: DeliveryService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule],
    providers:[DeliveryService]});
    service = TestBed.inject(DeliveryService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
