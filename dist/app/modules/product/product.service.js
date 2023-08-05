"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
const createProductInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield product_model_1.Product.create(payload)).populate('category');
    return result;
});
const getProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id).populate('category');
    if (!result) {
        throw new ApiError_1.default(404, `Error: product with ID ${id} is not found. Please verify the provided ID and try again`);
    }
    return result;
});
const getAllProductsFromDB = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, category, isFeatured } = filters;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (category) {
        andConditions.push({ category: category });
    }
    if (searchTerm) {
        andConditions.push({
            $or: product_constant_1.productSearchableFields.map(field => ({
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
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield product_model_1.Product.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate('category');
    const total = yield product_model_1.Product.countDocuments(whereConditions).limit(limit);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.productService = {
    createProductInDB,
    getProductByIdFromDB,
    getAllProductsFromDB,
};
