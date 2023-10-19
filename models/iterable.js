import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const IterableSchema = new Schema(
  {
    value: [String],
    identifier: String,
    extra: String,
  },
  {
    collection: "iterables",
  }
);
IterableSchema.plugin(timestamps);

IterableSchema.index({ createdAt: 1, updatedAt: 1 });

export const Iterable = mongoose.model("Iterable", IterableSchema);
