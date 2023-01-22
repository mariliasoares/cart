import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { IProductCart } from '../../models/cart.interface';
import { IProduct } from '../../models/product.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';

const CART_STORAGE_KEY = 'Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: IProductCart[] = [];
  private cartBehavior: BehaviorSubject<IProductCart[]> = new BehaviorSubject<IProductCart[]>([]);
  private subtotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private cartTotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private localStorageService: LocalStorageService) {
    this.cartItems = this.localStorageService.get(CART_STORAGE_KEY) || [];
    console.log(this.cartItems);
  
  }

  containsProductInCart(id: number): boolean {
    return this.cartItems.some((item) => item.info.id === id);
  }

  saveCart(): void {
    this.localStorageService.set(CART_STORAGE_KEY, this.cartItems);
  }

  saveCartBehavior(): void {
    this.cartBehavior.next(this.cartItems);
  }

  addItem(item: IProduct): void {
    if (!this.containsProductInCart(item.id)) {
      this.cartItems.push({
        amount: 1,
        totalPrice: item.price,
        info: item,
      });
      this.cartBehavior.next(this.cartItems);
      this.saveCart();
      console.log(this.cartItems);
      this.updateCartTotals();
      return;
    }

    const productIndex = this.findProductIndex(item.id);
    this.increaseProductAmount(productIndex);
    const cartProduct = this.getProduct(productIndex);
    this.updateProductTotalPrice(cartProduct, productIndex);

    console.log(this.cartItems);
    this.updateCartTotals();
  }

  increaseProductAmount(index: number, value: number = 1): void {
    this.cartItems[index].amount += value;
    this.saveCart();
    this.saveCartBehavior();
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
        this.saveCart();
        this.saveCartBehavior();
        this.updateCartTotals();
        return;
      }
    });
  }

  changeProductAmount(
    product: IProductCart,
    index: number,
    newAmount: number
  ): void {
    this.cartItems[index].amount = newAmount;
    this.saveCart();
    this.saveCartBehavior();
    this.updateProductTotalPrice(
      product,
      this.findProductIndex(product.info.id)
    );
    this.updateCartTotals();
  }

  productAmount(index: number): number {
    return this.cartItems[index].amount;
  }

  updateCartTotals(): void {
    this.cartTotal.next(this.calculateCartTotal());
    this.subtotal.next(this.calculateCartTotal());
  }

   cart(): Observable<IProductCart[]> {
    console.log('called2');
    return this.cartBehavior.asObservable();
  }

   cartSubtotal(): BehaviorSubject<number> {
    return this.subtotal;
  }

   cartTotalPurchase(): BehaviorSubject<number> {
    return this.cartTotal;
  }
}
