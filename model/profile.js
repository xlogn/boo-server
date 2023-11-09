const mongoose = require("mongoose");

/*
* {
    "id": 1,
    "name": "A Martinez",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png",
  }
* */

const profileModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    mbti: {
        type: String,
        required: true,
    },
    enneagram: {
        type: String,
    },
    variant: {
        type: String,
    },
    tritype: {
        type: String,
    },
    socionics: {
        type: String,
    },
    sloan: {
        type: String,
    },
    psyche: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
})

const profileSchema = mongoose.Schema.profiles || mongoose.model("profile", profileModel);

exports.profileSchema = profileSchema;