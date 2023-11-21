import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const UserSchema = new Schema(
  {
    email: String,
    name: String,
    image: String,
    registeredCourses: [
      {
        course: { type: Schema.Types.ObjectId, ref: "Course" },
        completed: Boolean,
        progress: Number,
        completionDate: String,
        code: String,
        amount: Number,
        phoneNumber: String,
        timestamp: String,
      },
    ],
  },
  {
    collection: "users",
  }
);

UserSchema.plugin(timestamps);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const User = mongoose.model("User", UserSchema);
