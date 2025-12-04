import mongoose from "mongoose";

const formResponseSchema = new mongoose.Schema(
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
    token: { type: String, required: true },
    responses: { type: Object, required: true },
  },
  { timestamps: true }
);

formResponseSchema.index({ token: 1 }, { unique: true });

const FormResponse = mongoose.model("FormResponse", formResponseSchema);
export default FormResponse;
