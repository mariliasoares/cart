import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { IProduct } from '../models/store.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  cartItems = {
    5: {
      unidade: 2,
      item: {
        id: 5,
        title:
          "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        price: 695,
        description:
          "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
        category: 'jewelery',
        image:
          'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
        rating: {
          rate: 4.6,
          count: 400,
        },
      },
    },
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>('https://fakestoreapi.com/products')
      .pipe(take(1));
  }
}
