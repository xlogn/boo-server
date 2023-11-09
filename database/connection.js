const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

async function connectToMongoDB(){
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {dbName: 'boo_db'});
    console.log(`Connected to mongo db, uri ${mongoUri}`);
}

exports.connectToMongoDB = connectToMongoDB;