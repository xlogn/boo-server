'use strict';

const express = require('express');
const {voteSchema} = require("../model/vote");
const router = express.Router();


module.exports = function() {
    router.get('/:profileId', async function(req, res, next) {

        const profileId = req?.params?.profileId;

        const votes = await voteSchema.find({
            profileId: profileId
        });

        if(!votes) {
            return res.status(200).json({msg: "No vote exists with this id."});
        } else {
            return res.status(200).json({data: votes});
        }
    });

    router.post('/', async function(req, res) {
        const profileId = req?.body?.profileId,
            voterProfileId = req?.body?.voterProfileId,
            title = req?.body?.title,
            voteMeta = req?.body?.voteMeta,
            comment = req?.body?.comment,
            likes = {};
        const vote = new voteSchema({
            profileId: profileId,
            voterProfileId: voterProfileId,
            title: title,
            voteMeta: voteMeta,
            comment: comment,
            likes: likes
        });

        vote.save().then((details) => {
            return res.status(201).json({data: vote});
        }).catch((err) => {
            return res.status(500).json({err: err.message});
        });
    })

    // update vote.

    // like / unlike
    router.post("/updateLike", async function (req, res) {
        const updateLikeList = req?.body?.likeList;
        const updateRemoveLikeList = req?.body?.removeLikeList;
        const voteId = req?.body?.voteId;

        const vote = await voteSchema.findById(voteId);

        if(!vote) {
            return res.status(200).json({msg: "No vote exists with this id."});
        }

        if(!vote?.likes) {
            vote.likes = {};
        }

        const likes = vote?.likes;

        if(updateLikeList) {
            updateLikeList?.forEach((profileThatLiked) => {
                likes[profileThatLiked] = 1;
            })
        }
        if(updateRemoveLikeList) {
            updateRemoveLikeList?.forEach((profileNotLiked) => {
                delete likes[profileNotLiked];
            })
        }

        vote.save().then((details) => {
            return res.status(201).json({data: vote});
        }).catch((err) => {
            return res.status(500).json({err: err.message});
        });

    })

    return router;
}