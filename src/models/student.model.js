import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    first_name: {
      type: String,
      minLength: 1,
      maxLength: 15,
      required: true,
    },
    last_name: {
      type: String,
      minLength: 1,
      maxLength: 15,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
      match: /^[0-9]{10,15}$/,
    },
    address: {
      type: String,
      minLength: 1,
      maxLength: 25,
    },
    birthdate: {
      type: Date,
    },
    groups: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "groups",
        },
      ],
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

export const studentModel = mongoose.model("students", studentSchema);
