import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';
import { IProductCart } from './models/cart.interface';
import { IProduct } from './models/product.interface';
import { StoreService } from './services/store.service';

@Component({
  selector: 'store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  @ViewChild('sidenav') cart: any;
  
  public productAmount: FormControl = new FormControl(1);
  public products$: Observable<IProduct[]> = new Observable<[]>();
  public cartItems: IProductCart[] = [];
  public amountOfProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public cartTotal: number = 0;
  public subtotal: number = 0;

  constructor(private storeService: StoreService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.products$ = this.storeService.getProducts().pipe(
      map((data) => data.products),
      catchError((err) => {
        this.handleError();
        return of([]);
      })
    );
  }

  handleError() {
    this.dialog.open(ErrorDialogComponent);
  }

  containsProductInCart(id: number): boolean {
    return this.cartItems.some((item) =>item.info.id === id);
  }

  addToCard(item: IProduct) {
    this.addItem(item);
    this.cart.open();
  }

  addItem(item: IProduct): void {
    if (!this.containsProductInCart(item.id)) {
      this.cartItems.push({
        amount: 1,
        totalPrice: item.price,
        info: item,
      });
      console.log(this.cartItems);
      this.cartTotal = this.calculateCartTotal();
      this.subtotal = this.cartTotal;
      return;
    }

    const productIndex = this.findProductIndex(item.id);
    this.increaseProductAmount(productIndex);
    const cartProduct = this.getProduct(productIndex);
    this.updateProductTotalPrice(cartProduct, productIndex);

    console.log(this.cartItems);
    this.cartTotal = this.calculateCartTotal();
    this.subtotal = this.cartTotal;
  }

  increaseProductAmount(index: number): void {
    const MAX_ITEMS_PER_PURCHASE = 9;
    if (this.cartItems[index].amount < MAX_ITEMS_PER_PURCHASE) {
      this.cartItems[index].amount += 1;
      this.productAmount.setValue(this.cartItems[index].amount);
    }
  }

  handleProductAmountChange(product: IProductCart, index: number): void {
    this.cartItems[index].amount = this.productAmount.value;
    this.updateProductTotalPrice(
      product,
      this.findProductIndex(product.info.id)
    );
    this.cartTotal = this.calculateCartTotal();
    this.subtotal = this.cartTotal;
  }

  calculateItemTotalPrice(product: IProductCart): number {
    return product.amount * product.info.price;
  }

  findProductIndex(id: number): number {
    let productIndex = -1;
    this.cartItems.forEach((item, index) => {
      if (item.info.id === id) {
        console.log(item);
        productIndex = index;
        return;
      }
    });

    return productIndex;
  }

  getProduct(index: number): IProductCart {
    return this.cartItems[index];
  }

  updateProductTotalPrice(product: IProductCart, index: number): void {
    this.cartItems[index].totalPrice = this.calculateItemTotalPrice(product);
  }

  calculateCartTotal(): number {
    if (this.cartItems.length === 0) return 0;
    return this.cartItems
      .map((product) => product.totalPrice)
      .reduce((acc, cur) => acc + cur);
  }

  deleteItem(id: number): void {
    this.cartItems.forEach((product, index) => {
      if (product.info.id === id) {
        this.cartItems.splice(index, 1);
        this.cartTotal = this.calculateCartTotal();
        this.subtotal = this.cartTotal;
        return;
      }
    });
  }

  checkEmptyCart() {
    return !(this.cartItems.length > 0);
  }
}
