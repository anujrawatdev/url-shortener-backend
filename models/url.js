const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({

    shortId:{ type: String },
    redirectURL:{ type: String},
});

const URL = mongoose.model("url",urlSchema);

module.exports = URL;