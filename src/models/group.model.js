import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 1,
      maxLength: 15,
      required: true,
    },
    teacher_name: {
      type: String,
      minLength: 1,
      maxLength: 15,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    students: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "students",
        },
      ],
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

export const groupModel = mongoose.model("groups", groupSchema);
