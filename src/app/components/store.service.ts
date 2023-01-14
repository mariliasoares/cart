import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { IProducts } from './store/shared/store.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProducts[]> {
    return this.http
      .get<IProducts[]>('https://fakestoreapi.com/products')
      .pipe(take(1));
  }
}
