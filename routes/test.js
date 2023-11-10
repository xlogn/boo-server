'use strict';

const express = require("express");
const {createTestData} = require("../profile.test");
const router = express.Router();

module.exports = function() {
    router.post('/', async function(req, res, next) {
        try {
            const vote = await createTestData();
            return res.status(200).json({msg: vote});
        } catch (e) {
            return res.status(200).json({msg: err.message});
        }
    });

    return router;
}