const express = require('express');
const {nanoid} = require("nanoid");
const router = express.Router();
const URL = require('../models/url');


router.post("/", async (req,res)=>{
   

    if(!req.body.url){

     return res.status(400).json({error:"url is required"});

    }

     const shortId = nanoid(8);

    await URL.create({
        shortId : shortId,
        redirectURL : req.body.url,
        createdBy:req.user._id,
    });
    
    res.render("home",{
        id:shortId,
    });
   
})

router.get("/", async(req,res)=>{
    const allUrls =  await URL.find({});

    return res.json(allUrls);
})

router.get("/:shortId", async(req,res)=>{

    const shortId = req.params.shortId;

  const entry  = await URL.findOne({
        shortId:shortId
    });

    if (!entry) {
        return res.status(404).json({ error: "URL not found" });
    }

    if (!entry.redirectURL) {
        return res.status(500).json({ error: "Redirect URL missing" });
    }

    return res.redirect(entry.redirectURL);
});
module.exports = router;