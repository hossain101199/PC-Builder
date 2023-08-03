import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IProduct } from './product.interface';
import { productService } from './product.service';

const createProduct: RequestHandler = catchAsync(async (req, res) => {
  const product = req.body;

  const result = await productService.createProductInDB(product);

  sendResponse<IProduct>(res, {
    statusCode: 200,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

export const productController = {
  createProduct,
};
