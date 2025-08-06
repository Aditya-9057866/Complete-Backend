const express = require("express");
const app = express();
const dotenv = require("dotenv")
const userRoute = require("./routes/userRoutes")
dotenv.config();
const PORT = process.env.PORT;
app.get("/", (req, res)=>{
  res.send("hey there")
})
// You forgot this 👇
app.use(express.json());

app.use("/api/users",userRoute)
 app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})