import { Schema, model } from "mongoose";

export const gender = {
  FEMALE: "female",
  MALE: "male",
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    userName: {
      type: String,
      required: [true, "userName is required"],
      unique: [true, "userName must be unique"],
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
      enum: {
        values: Object.values(gender),
        message: "gender must be female or male",
      },
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber is required"],
      unique: [true, "phoneNumber must be unique"],
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = model("User", userSchema);
export default User;