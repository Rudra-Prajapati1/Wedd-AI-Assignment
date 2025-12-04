import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import formRouter from "./routes/formRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("WeddAI Backend is Running...");
});

app.get("/ping", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/forms", formRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
