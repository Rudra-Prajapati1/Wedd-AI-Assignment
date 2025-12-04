import crypto from "crypto";
import Form from "../models/Form.js";
import Guest from "../models/Guest.js";
import FormGuest from "../models/FormGuest.js";

const generateToken = () => {
  return crypto.randomBytes(24).toString("hex");
};

export const addGuestAndGenerateToken = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { formId } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    email.includes()
    let guest = await Guest.findOne({ email });
    if (!guest) {
      guest = await Guest.create({ name, email });
    }

    let token = generateToken();
    while (await FormGuest.findOne({ token })) {
      token = generateToken();
    }

    const formGuest = await FormGuest.create({
      formId,
      guestId: guest._id,
      token,
    });

    const url = `${process.env.FRONTEND_URL}/form/${token}`;

    res
      .status(201)
      .json({ message: "Guest added and token generated", guest, token, url });
  } catch (error) {
    console.error("Add Guest Error: ", error);
    res.status(500).json({ message: "Server error while adding guest" });
  }
};
