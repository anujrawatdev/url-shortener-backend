const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({

    shortId:{ 
        type: String , 
        required: true , 
        unique: true,},

    redirectURL:{ 
        type: String , 
        required: true, 
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
    },
});

const URL = mongoose.model("url",urlSchema);

module.exports = URL;