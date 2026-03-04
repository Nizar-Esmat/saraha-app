import { Schema, Types, model } from "mongoose";

const massageSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Massage = model("massage", massageSchema);
