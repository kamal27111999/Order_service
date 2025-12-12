import express from "express";
import serverless from "serverless-http";
import dotenv from "dotenv";

import orderRoutes from "./routes/order.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is running (ESM version)!" });
});

app.get("/api/test", (req, res) => {
  res.json({ success: true, data: "API working fine!" });
});

if (process.env.IS_LOCAL === "true") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Local server running at http://localhost:${PORT}`);
  });
}

export const handler = serverless(app);
