import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, map, tap, take, takeUntil } from 'rxjs';

import { IProductCart } from '../../models/cart.interface';
import { CartService } from '../../services/cart/cart.service';
import { SidenavService } from '../../services/sidenav/sidenav.service';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss'],
})
export class MiniCartComponent implements OnInit, OnDestroy {
  public productAmount: FormControl = new FormControl(1);
  public amountOfProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public cart$: Observable<IProductCart[]> = new Observable<IProductCart[]>;
  public total$: Observable<number> = new Observable<number>;
  public subtotal$: Observable<number> = new Observable<number>;
  private ngUnsubscribe$ = new Subject();

  constructor(
    private cartService: CartService,
    private sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.cart();
    this.total$ = this.cartTotal();
    this.subtotal$ = this.cartSubtotal();
  }

  closeCart(): void {
    this.sidenavService.close();
  }

  cartSubtotal(): BehaviorSubject<number> {
    return this.cartService.cartSubtotal();
  }

  cartTotal(): BehaviorSubject<number> {
    return this.cartService.cartTotalPurchase();
  }


  deleteItem(id: number): void {
    this.cartService.deleteItem(id);
  }

  handleProductAmountChange(product: IProductCart, index: number, value: number): void {
      this.cartService.changeProductAmount(product, index, value);
      this.productAmount.setValue(this.cartService.productAmount(index)); 
    }

    ngOnDestroy() {
      this.ngUnsubscribe$.next(null);
      this.ngUnsubscribe$.complete();
    }
}
