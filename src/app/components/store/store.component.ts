import { IProducts } from './shared/store.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { StoreService } from './../store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  public products$: Observable<IProducts[]> = new Observable<[]>;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.products$ = this.storeService.getProducts().pipe(
      map((products) => products))
  }
}
