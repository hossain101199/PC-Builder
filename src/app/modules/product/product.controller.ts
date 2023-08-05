import { RequestHandler } from 'express';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { productFilterableFields } from './product.constant';
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

const getProductById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await productService.getProductByIdFromDB(id);

  sendResponse<IProduct>(res, {
    statusCode: 200,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProducts: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, productFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await productService.getAllProductsFromDB(
    filters,
    paginationOptions
  );

  sendResponse<IProduct[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Products retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const productController = {
  createProduct,
  getProductById,
  getAllProducts,
};
