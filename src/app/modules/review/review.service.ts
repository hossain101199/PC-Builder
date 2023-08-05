import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Product } from '../product/product.model';
import { IReview } from './review.interface';
import { Review } from './review.model';

const createReviewInDB = async (payload: IReview): Promise<IReview> => {
  const product = await Product.findById(payload.product);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  const createdReview = (await Review.create(payload)).populate('product');

  return createdReview;
};

const getReviewsByBookIdFromDB = async (
  id: string,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IReview[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Review.find({ product: id })
    .populate('product')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments({ product: id });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const reviewService = {
  createReviewInDB,
  getReviewsByBookIdFromDB,
};
