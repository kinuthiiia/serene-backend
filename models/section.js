import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const SectionSchema = new Schema(
  {
    value: String,
    identifier: String,
  },
  {
    collection: "sections",
  }
);
SectionSchema.plugin(timestamps);

SectionSchema.index({ createdAt: 1, updatedAt: 1 });

export const Section = mongoose.model("Section", SectionSchema);
