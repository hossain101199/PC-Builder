import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ICategory } from './category.interface';
import { categoryService } from './category.service';

const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const category = req.body;

  const result = await categoryService.createCategoryInDB(category);

  sendResponse<ICategory>(res, {
    statusCode: 200,
    success: true,
    message: 'Category is created successfully',
    data: result,
  });
});

const getAllCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await categoryService.getAllCategoryFromDB();

  sendResponse<ICategory[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getAllCategory,
};
