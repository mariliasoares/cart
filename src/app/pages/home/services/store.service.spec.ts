import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { StoreService } from './store.service';

fdescribe('StoreService', () => {
  let service: StoreService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(StoreService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud get all products', () => {
    service.getProducts().subscribe();
    
    const req = httpController.expectOne('https://dummyjson.com/products?limit=20');
    
    expect(req.request.url).toBe('https://dummyjson.com/products?limit=20');
    expect(req.request.method).toBe('GET');
  
  });
});
