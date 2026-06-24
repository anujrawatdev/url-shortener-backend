const express = require('express');
const app = express();

const urlRoute = require("./routes/url.js");
const port = 8001;

const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


const path = require('path');
const URL = require("./models/url");
const staticRoute = require('./routes/staticRouter.js');
const userRoute = require('./routes/user.js')
const connectToMongoDb = require("./connection");
const {restrictTo ,checkForAuthentication }= require('./middleware/auth');


connectToMongoDb("mongodb://127.0.0.1:27017/url-shortner")
.then(()=> console.log("MongoDB conneccted"))
.catch((err) => console.log(err));

app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

app.get("/test",async(req , res)=>{
    const allUrls = await URL.find({});
    return res.render("home",{
        urls: allUrls,
    });
});


app.use(checkForAuthentication);
app.use("/url" , restrictTo(["NORMAL"]) , urlRoute);
app.use("/user",userRoute);
app.use("/"  ,staticRoute);



app.listen(port,()=> console.log('server started'));