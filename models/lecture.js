import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const LectureSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    title: String,
    content: String,
    description: String,
    timeEstimate: Number,
    removed: Boolean,
    quiz: [
      {
        question: String,
        options: [String],
        answer: Number,
      },
    ],
  },
  {
    collection: "lectures",
  }
);

LectureSchema.plugin(timestamps);

LectureSchema.index({ createdAt: 1, updatedAt: 1 });

export const Lecture = mongoose.model("Lecture", LectureSchema);
