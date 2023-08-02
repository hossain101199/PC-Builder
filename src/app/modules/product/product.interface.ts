import { Types } from 'mongoose';
import { ICategory } from '../category/category.interface';

export type IProduct = {
  title: string;
  category: Types.ObjectId | ICategory;
  status: 'in stock' | 'out of stock';
  price: number;
  description: string;
  keyFeatures: { key: string; value: string }[];
  rating: number;
  isFeatured: boolean;
};
