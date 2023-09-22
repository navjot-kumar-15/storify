import mongoose from "mongoose";

const personSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    name: {
      type: String,
      required: [true, "Name is required "],
    },
    email: {
      type: String,
      required: [true, "Email is required "],
    },
    phone: {
      type: Number,
      required: [true, "Phone is required "],
    },
    gender: {
      type: String,
      required: [true, "Gender is required "],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("person", personSchema);
