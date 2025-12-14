const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const rootRouter = require("./routes/index");
require("dotenv").config( { quiet: true });

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);
const port = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // stop app if database fails
  }
};
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
