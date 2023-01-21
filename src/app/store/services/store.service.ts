import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';
import { IProductLimit } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProductLimit> {
    return this.http
      .get<IProductLimit>('https://dummyjson.com/products?limit=20')
      .pipe(
        take(1),
        map((products) => products)
      );
  }
}
