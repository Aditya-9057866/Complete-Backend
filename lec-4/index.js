const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const cookieParser = require('cookie-parser')

dotenv.config();
app.use(express.json());  //  parse json req body
app.use(cookieParser());//parse cookies from the req body

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("hey there");
});
app.use("/api/auth", authRoute);

// Start server only after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to DB", err);
});