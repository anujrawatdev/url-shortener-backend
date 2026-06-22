const express = require('express');
const app = express();
app.use(express.json());

const connectToMongoDb = require("./connection");

connectToMongoDb("mongodb://127.0.0.1:27017/url-shortner")
.then(()=> console.log("MongoDB conneccted"))
.catch((err) => conosle.log(err));

const userRoute = require("./routes/url.js");
const port = 8001;

app.use("/url",userRoute);




app.listen(port,()=> console.log('server started'));