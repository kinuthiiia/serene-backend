import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const UserSchema = new Schema(
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
    collection: "users",
  }
);

UserSchema.plugin(timestamps);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const User = mongoose.model("User", UserSchema);
