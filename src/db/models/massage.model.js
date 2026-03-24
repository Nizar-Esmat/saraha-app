import { Schema, Types, model } from "mongoose";

const massageSchema = new Schema(
  {
    content: {
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
    versionKey: false,
  },
);

const Massage = model("massage", massageSchema);

export default Massage;
