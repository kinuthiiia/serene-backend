import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const CourseSchema = new Schema(
  {
    name: String,
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
    price: Number,
    description: String,
    image: String,
    category: String,
    onSale: Boolean,
    was: Number,
  },
  {
    collection: "courses",
  }
);

CourseSchema.plugin(timestamps);

CourseSchema.index({ createdAt: 1, updatedAt: 1 });

export const Course = mongoose.model("Course", CourseSchema);
