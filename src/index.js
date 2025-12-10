import express from "express";
import serverless from "serverless-http";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// -------- Test Route --------
app.get("/", (req, res) => {
  res.json({ message: "Server is running (ESM version)!" });
});

// -------- Example API Route --------
app.get("/api/test", (req, res) => {
  res.json({ success: true, data: "API working fine!" });
});

// -------- LOCAL MODE --------
if (process.env.IS_LOCAL === "true") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Local server running at http://localhost:${PORT}`);
  });
}

// -------- LAMBDA EXPORT --------
export const handler = serverless(app);
