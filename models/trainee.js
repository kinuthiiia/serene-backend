import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const TraineeSchema = new Schema(
  {
    email: String,
    fullName: String,
    image: String,
    password: String,
    registeredCourses: [
      {
        course: { type: Schema.Types.ObjectId, ref: "Course" },
        completed: Boolean,
        progress: Number,
      },
    ],
  },
  {
    collection: "trainees",
  }
);

TraineeSchema.plugin(timestamps);

TraineeSchema.index({ createdAt: 1, updatedAt: 1 });

export const Trainee = mongoose.model("Trainee", TraineeSchema);
