import express from "express";
import dotenv, { parse } from "dotenv";
import { initDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

import transactionRoute from "./routes/transactionRaute.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") job.start();

app.use(ratelimiter);
app.use(express.json());
// app.use((req, res, next) => {
//   console.log("hey we got a request!, ", req.method);
//   next();
// });
const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.get("/", (req, res) => {
  res.send("sakupintar API");
});

app.use("/api/transactions", transactionRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});
