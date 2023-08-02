import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategoryInDB = async (payload: ICategory): Promise<ICategory> => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategoryFromDB = async (): Promise<ICategory[]> => {
  const result = await Category.find({});

  return result;
};

export const categoryService = {
  createCategoryInDB,
  getAllCategoryFromDB,
};
