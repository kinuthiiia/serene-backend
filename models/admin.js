import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const AdminSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    image: String,
    email: String,
    phoneNumber: String,
    password: String,
    canModifyUsers: Boolean,
    canModifyContent: Boolean,
    canModifySections: Boolean,
    canModifyProducts: Boolean,
  },
  {
    collection: "admins",
  }
);

AdminSchema.plugin(timestamps);

AdminSchema.index({ createdAt: 1, updatedAt: 1 });

export const Admin = mongoose.model("Admin", AdminSchema);
