import express from "express";
import {
  createForm,
  deleteFormById,
  getAllForms,
  getFormById,
} from "../controllers/formController.js";
import { addGuestAndGenerateToken } from "../controllers/guestController.js";
import {
  getAllResponses,
  submitResponse,
  validateTokenAndGetForm,
} from "../controllers/responseController.js";

const formRouter = express.Router();

formRouter.post("/", createForm);
formRouter.get("/", getAllForms);
formRouter.get("/:formId", getFormById);
formRouter.delete("/:formId", deleteFormById);

formRouter.post("/:formId/guests", addGuestAndGenerateToken);

formRouter.get("/token/:token", validateTokenAndGetForm);

formRouter.post("/:formId/response", submitResponse);
formRouter.get("/:formId/responses", getAllResponses);

export default formRouter;
