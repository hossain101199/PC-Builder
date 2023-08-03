import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductInDB = async (payload: IProduct): Promise<IProduct> => {
  const result = (await Product.create(payload)).populate('category');
  return result;
};

export const productService = {
  createProductInDB,
};
