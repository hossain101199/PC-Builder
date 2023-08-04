"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    status: {
        type: String,
        enum: ['in stock', 'out of stock'],
        required: true,
    },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    keyFeatures: [{ key: { type: String }, value: { type: String } }],
    rating: { type: Number, required: true, min: 0, max: 5 },
    isFeatured: { type: Boolean, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
