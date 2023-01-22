import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../models/product.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() product: any;
  @Output() addProductToCart = new EventEmitter<IProduct>();

  constructor() { }

  ngOnInit(): void {
  }

  addToCart() {
    if (this.product)
    this.addProductToCart.emit(this.product);
  }
}
