import { Schema, model } from 'mongoose';

import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Product = model<IProduct>('Product', productSchema);
