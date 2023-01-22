import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, Observable, of, take } from 'rxjs';
import SwiperCore, { Autoplay, Navigation } from 'swiper';

import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { IProduct } from '../../shared/models/product.interface';
import { CartService } from '../../shared/services/cart/cart.service';
import { SidenavService } from '../../shared/services/sidenav/sidenav.service';
import { StoreService } from './services/store.service';

SwiperCore.use([Autoplay, Navigation]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement> | any;

  public products$: Observable<IProduct[]> = new Observable<[]>();

  public eletronics: any = [];
  public fragances: any = [];

  constructor(
    private storeService: StoreService,
    private SidenavService: SidenavService,
    public dialog: MatDialog,
    private cart: CartService
  ) {
  }

  ngOnInit(): void {
    this.products$ = this.storeService.getProducts().pipe(
      take(1),
      map((data) => {
        this.eletronics = data.products.filter((item) => item.category === 'smartphones' || item.category === 'laptops');
        this.fragances = data.products.filter((item) => item.category === 'fragrances' || item.category === 'skincare');
        return data.products;
      }),
      catchError((err) => {
        this.handleError();
        return of([]);
      })
    );
  }

  onSwiper([swiper]: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  addProductToCart(item: IProduct) {
    this.cart.addItem(item);
    this.SidenavService.open();
  }

  handleError() {
    this.dialog.open(ErrorDialogComponent);
  }

  ngOnDestroy() {
  }
}
