const express = require('express')
const app = express()
require('dotenv').config()
const router = express.Router();
const cors = require("cors")
const port = process.env.PORT || 3030
const mongoose = require('mongoose');
const weekRoute = require("./Routes/weekRoute")

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL)
.then((res)=>{
  console.log("mongoDb connected")
})
.catch((error)=>{
  console.log("error while connecting mongoDb ",error)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/week",weekRoute)

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})