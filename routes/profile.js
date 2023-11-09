'use strict';

const express = require('express');
const router = express.Router();
const {profileSchema} = require("../model/profile");

const profiles = [
  {
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
];

module.exports = function() {

  router.get('/:profileId', async function(req, res, next) {

    const profileId = req?.params?.profileId;

    const profile = await profileSchema.findById(profileId);

    if(!profile) {
      return res.status(200).json({msg: "No profile exists with this id."});
    } else {
      return res.render('profile_template', {
        profile:profile,
      });
    }
  });

  router.post("/", async function (req, res) {
    const name = req?.body?.name,
        description = req?.body?.description || "",
        mbti = req?.body?.mbti,
        enneagram = req?.body?.enneagram || "",
        variant = req?.body?.variant || "",
        tritype = req?.body?.tritype || "",
        socionics = req?.body?.socionics || "",
        sloan = req?.body?.sloan || "",
        psyche = req?.body?.psyche || "",
        image = req?.body?.image || "https://soulverse.boo.world/images/1.png";


    if(!name || !mbti){
      return res.status(500).json({err: "Invalid params"});
    }
    const profile = new profileSchema({
      name: name,
      description:  description,
      mbti: mbti,
      enneagram: enneagram ,
      variant:variant ,
      tritype: tritype ,
      socionics: socionics,
      sloan: sloan,
      psyche: psyche ,
      image: image
    });


    profile.save().then((details) => {
      return res.status(201).json({data: details});
    }).catch((err) => {
      return res.status(500).json({err: err.message});
    });
  })

  return router;
}

