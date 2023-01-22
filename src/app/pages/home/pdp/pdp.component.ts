import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, Subject } from 'rxjs';

import { IProduct } from '../../../shared/models/product.interface';
import { CartService } from '../../../shared/services/cart/cart.service';
import { SidenavService } from '../../../shared/services/sidenav/sidenav.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.scss'],
})
export class PdpComponent implements OnInit {
  public product$: Observable<IProduct | null> = new Observable();
  public errors$: Subject<boolean> = new Subject<boolean>();
  public productAmount: FormControl = new FormControl(1);
  constructor(
    private activeRoute: ActivatedRoute,
    private route: Router,
    private store: StoreService,
    private cartService: CartService,
    private sidenav: SidenavService
  ) {}

  ngOnInit(): void {
    this.getIdFromActiveRouter();
  }

  getIdFromActiveRouter(): void {
    const id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.getProduct(id);
      return;
    }

    this.route.navigate(['/']);
  }

  getProduct(id: number): void {
    this.product$ = this.store.getProductById(id).pipe(
      map((product) => product),
      catchError((_: HttpErrorResponse) => {
        this.errors$.next(true);
        return of(null);
      })
    );
  }

  addProductToCart(product: IProduct): void {
    if (this.cartService.containsProductInCart(product.id)) {
      const index = this.cartService.findProductIndex(product.id);
      this.cartService.increaseProductAmount(index, this.productAmount.value);
      this.sidenav.open();
      return;
    }

    this.cartService.addItem(product);
    const index = this.cartService.findProductIndex(product.id);
    const productInCart = this.cartService.getProduct(index);
    this.cartService.changeProductAmount(productInCart, index,  this.productAmount.value);
    this.sidenav.open();
  }
}
