import Form from "../models/Form.js";
import FormGuest from "../models/FormGuest.js";
import FormResponse from "../models/FormResponse.js";

export const createForm = async (req, res) => {
  try {
    const { title, description, fields } = req.body;

    if (!title || !fields || fields.length === 0) {
      return res.status(400).json({ message: "Title and fields are required" });
    }

    const form = await Form.create({ title, description, fields });

    return res.status(201).json({ message: "Form created successfully", form });
  } catch (error) {
    console.error("Create Form Error: ", error);
    res.status(500).json({ message: "Server error while creating form" });
  }
};

export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    console.error("Get All Forms Error: ", error);
    res.status(500).json({ message: "Server error while getting all forms" });
  }
};

export const getFormById = async (req, res) => {
  try {
    const { formId } = req.params;

    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(form);
  } catch (error) {
    console.error("Get Form Error:", error);
    res.status(500).json({ message: "Server error while getting the form" });
  }
};

export const deleteFormById = async (req, res) => {
  try {
    const { formId } = req.params;

    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    await Form.findByIdAndDelete(formId);
    await FormGuest.deleteMany({ formId });
    await FormResponse.deleteMany({ formId });

    res.json({ message: "Form and all related data deleted successfully" });
  } catch (error) {
    console.error("Delete Form Error:", error.message);
    res.status(500).json({ message: "Server error while deleting the form" });
  }
};
