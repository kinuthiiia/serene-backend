import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const ProductSchema = new Schema(
  {
    category: String,
    subCategory: String,
    name: String,
    image: String,
    specSheet: String,
    description: String,
    removed: Boolean,
    featured: Boolean,
    price: Number,
  },
  {
    collection: "products",
  }
);

ProductSchema.plugin(timestamps);

ProductSchema.index({ createdAt: 1, updatedAt: 1 });

export const Product = mongoose.model("Product", ProductSchema);
