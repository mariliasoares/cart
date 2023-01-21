export interface IProductLimit {
  limit: number;
  products: Array<IProduct>;
  skip: number;
  total: number;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage:number
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}


