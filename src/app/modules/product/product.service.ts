import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { productSearchableFields } from './product.constant';
import { IProduct, IProductFilters } from './product.interface';
import { Product } from './product.model';

const createProductInDB = async (payload: IProduct): Promise<IProduct> => {
  const result = (await Product.create(payload)).populate('category');
  return result;
};

const getProductByIdFromDB = async (id: string): Promise<IProduct> => {
  const result = await Product.findById(id).populate('category');

  if (!result) {
    throw new ApiError(
      404,
      `Error: product with ID ${id} is not found. Please verify the provided ID and try again`
    );
  }

  return result;
};

const getAllProductsFromDB = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, category, isFeatured } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (category) {
    andConditions.push({ category: category });
  }

  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (isFeatured) {
    andConditions.push({ isFeatured: isFeatured });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('category');

  const total = await Product.countDocuments(whereConditions).limit(limit);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const productService = {
  createProductInDB,
  getProductByIdFromDB,
  getAllProductsFromDB,
};
