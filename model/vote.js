/*
id: ?
profileId: foreign key to profile
voterProfileId: foreign key to profile
title: ?
vote: {voteKey: "MBTI", voteValue: "INTP"}
comment: ?
likes: {"profileId":1}
* */

const mongoose = require("mongoose");

const voteModel = new mongoose.Schema({
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'profiles', required: true },
    voterProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'profiles', required: true },
    title: {type: String, required: true},
    voteMeta: {type: mongoose.Schema.Types.Mixed},
    comment: {type: String, required: true},
    likes: {type: mongoose.Schema.Types.Mixed}
});

const voteSchema = mongoose.Schema.votes || mongoose.model("vote", voteModel);

exports.voteSchema = voteSchema;