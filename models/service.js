import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const ServiceSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    mini: Boolean,
  },
  {
    collection: "services",
  }
);

ServiceSchema.plugin(timestamps);

ServiceSchema.index({ createdAt: 1, updatedAt: 1 });

export const Service = mongoose.model("Service", ServiceSchema);
