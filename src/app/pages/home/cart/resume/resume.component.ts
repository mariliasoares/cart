import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { IProductCart } from 'src/app/shared/models/cart.interface';

import { CartService } from './../../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  public productAmount: FormControl = new FormControl(1);
  public cart$: Observable<IProductCart[]> = new Observable<IProductCart[]>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {  
    this.cart$ = this.cartItems();
  }

  cartItems():  Observable<IProductCart[]> {
    return this.cartService.cart();
  }

  deleteItem(id: number): void {
    this.cartService.deleteItem(id);
  }

}
