import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { IProduct } from '../../shared/models/product.interface';
import { CartService } from '../../shared/services/cart/cart.service';
import { SidenavService } from '../../shared/services/sidenav/sidenav.service';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public products$: Observable<IProduct[]> = new Observable<[]>();

  constructor(
    private storeService: StoreService,
    private SidenavService: SidenavService,
    public dialog: MatDialog,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.products$ = this.storeService.getProducts().pipe(
      map((data) => data.products),
      catchError((err) => {
        this.handleError();
        return of([]);
      })
    );
  }

  addProductToCart(item: IProduct) {
    this.cart.addItem(item);
    this.SidenavService.open();
  }

  handleError() {
    this.dialog.open(ErrorDialogComponent);
  }
}
