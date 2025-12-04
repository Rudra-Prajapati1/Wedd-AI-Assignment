import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["text", "textarea", "number", "dropdown", "date", "multiselect"],
    },
    options: [String],
    required: { type: Boolean, default: false },
  },
  { _id: false }
);

const formSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    fields: [fieldSchema],
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);
export default Form;
