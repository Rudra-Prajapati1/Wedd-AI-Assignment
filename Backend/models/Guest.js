import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, lowercase: true },
  },
  { timestamps: true }
);

const Guest = mongoose.model("Guest", guestSchema);
export default Guest;
