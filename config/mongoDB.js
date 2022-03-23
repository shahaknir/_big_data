const mongoose = require('mongoose');
const config = require('./default.json');
const URI = "mongodb+srv://kobi:Kobian054@cluster0.ze2y4.mongodb.net/Cluster0?retryWrites=true&w=majority";



const connectionMongoDB = async () => {
    try {
        await mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
            console.log(`error from mongoDB: ${err}`);
        });
        console.log('MongoDB Connected..');
    } catch (err) {
        console.log('MongoDB is not Connected***************************************');
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

connectionMongoDB();

module.exports = connectionMongoDB;