'use strict';

const express = require('express');
const {voteSchema} = require("../model/vote");
const {profileSchema} = require("../model/profile");
const router = express.Router();


module.exports = function() {
    router.get('/:profileId', async function(req, res, next) {

        try {
            const profileId = req?.params?.profileId,
                sort = req?.body.sort ?? {}, filters = req.body.filters ?? {};

            const allowedSortKeys = ["mbti", "enneagram", "zodiac"];

            const filterKeys = Object.keys(filters)?.filter((key) => allowedSortKeys.includes(key) && filters[key]) || [];

            let votes = await voteSchema.find({
                profileId: profileId
            }).lean();

            if(filterKeys && votes && filterKeys?.length > 0 && votes?.length > 0){
                const profileIds = votes?.map((vote) => vote?.voterProfileId.toString());
                const profileFilter = {};
                filterKeys?.forEach((key) => {profileFilter[key] = filters[key]});
                const profiles = await profileSchema.find({
                    ...profileFilter, _id: {$in: profileIds}
                })
                const relProfilesId = profiles?.map((profile) => profile?._id.toString()) || [];

                votes = votes.filter((vote) => relProfilesId.includes(vote?.voterProfileId?.toString()));
            }


            if(!votes) {
                return res.status(200).json({
                    msg: "No vote exists with this id."
                });
            } else {
                return res.status(200).json({data: votes});
            }

        } catch (err) {
            return res.status(200).json({msg: err.message});
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