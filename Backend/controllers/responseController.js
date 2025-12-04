import FormGuest from "../models/FormGuest.js";
import FormResponse from "../models/FormResponse.js";

export const validateTokenAndGetForm = async (req, res) => {
  try {
    const { token } = req.params;

    const formGuest = await FormGuest.findOne({ token })
      .populate("formId")
      .populate("guestId");

    if (!formGuest) {
      return res.status(404).json({ message: "Invalid token" });
    }

    if (formGuest.submitted) {
      return res.status(400).json({ message: "Form already submitted" });
    }

    res.json({
      form: formGuest.formId,
      guest: formGuest.guestId,
      token: formGuest.token,
    });
  } catch (error) {
    console.error("Validate Token Error:", error);
    res.status(500).json({ message: "Server error while validating token" });
  }
};

export const submitResponse = async (req, res) => {
  try {
    const { formId } = req.params;
    const { token, responses } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const formGuest = await FormGuest.findOne({ token });

    if (!formGuest) {
      return res.status(404).json({ message: "Invalid token" });
    }

    if (formGuest.submitted) {
      return res.status(400).json({ message: "Form already submitted" });
    }

    if (formGuest.formId.toString() !== formId) {
      return res.status(400).json({ message: "Token does not match form" });
    }

    const updated = await FormGuest.findOneAndUpdate(
      { token, submitted: false },
      { $set: { submitted: true } },
      { new: true }
    );

    if (!updated) {
      return res
        .status(400)
        .json({ message: "Invalid token or already submitted" });
    }

    await FormResponse.create({
      formId,
      guestId: updated.guestId,
      token,
      responses,
    });

    res.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Submit Response Error:", error);
    res.status(500).json({ message: "Server error while submitting form" });
  }
};

export const getAllResponses = async (req, res) => {
  try {
    const { formId } = req.params;

    const responses = await FormResponse.find({ formId })
      .populate("guestId")
      .sort({ createdAt: -1 });

    res.json(responses);
  } catch (error) {
    console.error("Get Responses Error:", error);
    res.status(500).json({ message: "Server error while fetching responses" });
  }
};
