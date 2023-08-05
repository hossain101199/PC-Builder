import { Types } from 'mongoose';
import { IProduct } from '../product/product.interface';

export type IReview = {
  product: Types.ObjectId | IProduct;
  user: string;
  rating: number;
  comment: string;
};
