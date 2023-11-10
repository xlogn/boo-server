'use strict';

const express = require('express');
const {connectToMongoDB} = require("./database/connection");
const {createTestData} = require("./profile.test");
const app = express();
const port =  process.env.PORT || 3000;



connectToMongoDB().then(() => {

    // set the view engine to ejs
    app.set('view engine', 'ejs');

    app.use(express.json());

    // routes
    app.use('/', require('./routes/profile')());

    app.use('/vote', require('./routes/vote')());

    app.use('/test', require('./routes/test')());

    // start server
    const server = app.listen(port);
    console.log('Express started. Listening on %s', port);


}).catch((err) => {
    console.log(`Error occurred: ${err.message}`);
})
