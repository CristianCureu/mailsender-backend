const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");

const feedbackRoutes = require("./Routes/FeedbackRoutes");
const userRoutes = require("./Routes/UserRoutes");
const adminRoutes = require("./Routes/AdminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/feedback", feedbackRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

async function connectToDb() {
  mongoose.set("strictQuery", false);
  mongoose.connect(config.MONGO_CONNECTION_STRING);
}

async function main() {
  try {
    await connectToDb();
    app.listen(config.SERVER_PORT, () => {
      console.log(`Backend app listening on port ${config.SERVER_PORT}`);
    });
  } catch (err) {
    console.log("index::main error", err.message);
  }
}

main();
