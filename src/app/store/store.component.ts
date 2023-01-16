import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';
import { IProduct } from './models/product.interface';
import { StoreService } from './services/store.service';

@Component({
  selector: 'store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  @ViewChild('sidenav') cart: any;

  public products$: Observable<IProduct[]> = new Observable<[]>();
  public cartItems: IProduct[] = [];
  emptyCart = true;

  constructor(private storeService: StoreService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.products$ = this.storeService.getProducts().pipe(
      catchError((err) => {
        this.handleError();
        return of([]);
      })
    );
  }

  handleError() {
    this.dialog.open(ErrorDialogComponent);
  }

  openCart() {}

  addToCard(item: IProduct) {
    this.addItem(item);
    this.cart.open();
  }

  addItem(item: IProduct) {
    this.cartItems.push(item);
    console.log(this.cartItems);
  }

  deleteItem(id: number) {
    this.cartItems.forEach((item, index) => {
      if (item.id === id) {
        this.cartItems.splice(index, 1);
        return;
      }
    });
  }

  checkEmptyCart() {
    return !(this.cartItems.length > 0);
  }
}
