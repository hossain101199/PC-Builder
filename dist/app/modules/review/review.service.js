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
exports.reviewService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const product_model_1 = require("../product/product.model");
const review_model_1 = require("./review.model");
const createReviewInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(payload.product);
    if (!product) {
        throw new ApiError_1.default(404, 'Product not found');
    }
    const createdReview = (yield review_model_1.Review.create(payload)).populate('product');
    return createdReview;
});
const getReviewsByBookIdFromDB = (id, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield review_model_1.Review.find({ product: id })
        .populate('product')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield review_model_1.Review.countDocuments({ product: id });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.reviewService = {
    createReviewInDB,
    getReviewsByBookIdFromDB,
};
