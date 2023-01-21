import { IProduct } from './product.interface';

export interface IProductCart {
  amount: number;
  totalPrice: number;
  info: IProduct;
}