import mongoose from "mongoose";

const formGuestSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
    token: { type: String, required: true, unique: true },
    submitted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

formGuestSchema.index({ formId: 1, guestId: 1 }, { unique: true });
const FormGuest = mongoose.model("FormGuest", formGuestSchema);
export default FormGuest;
