import express from "express";
import dotenv, { parse } from "dotenv";
import { initDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

import transactionRoute from "./routes/transactionRaute.js";

dotenv.config();

const app = express();
app.use(ratelimiter);
app.use(express.json());
// app.use((req, res, next) => {
//   console.log("hey we got a request!, ", req.method);
//   next();
// });
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("sakupintar API");
});

app.use("/api/transactions", transactionRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});
