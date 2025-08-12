const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("hey there");
});
app.use("/api", userRoute);

// Start server only after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to DB", err);
});